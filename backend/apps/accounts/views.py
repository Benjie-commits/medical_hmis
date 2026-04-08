from datetime import timedelta
from django.contrib.auth import logout
from django.utils import timezone
from django_ratelimit.decorators import ratelimit
from rest_framework import status
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import LoginSerializer, MeSerializer


class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]
        role = serializer.validated_data["role"]
        remember_device = serializer.validated_data.get("rememberDevice", False)
        now = timezone.now()

        try:
            from .models import User
            user = User.objects.get(username=username)
        except User.DoesNotExist:
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        if user.locked_until and user.locked_until > now:
            return Response(
                {"message": "Account locked. Try again later."},
                status=status.HTTP_423_LOCKED,
            )

        if not user.check_password(password):
            user.failed_attempts += 1
            if user.failed_attempts >= 5:
                user.locked_until = now + timedelta(minutes=15)
                user.failed_attempts = 0
            user.save(update_fields=["failed_attempts", "locked_until", "updated_at"])
            return Response({"message": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        if user.role != role:
            return Response({"message": "Role mismatch for this account"}, status=status.HTTP_403_FORBIDDEN)
        if not user.is_active:
            return Response({"message": "User account is disabled"}, status=status.HTTP_403_FORBIDDEN)

        user.failed_attempts = 0
        user.locked_until = None
        user.last_login = now
        user.save(update_fields=["failed_attempts", "locked_until", "last_login", "updated_at"])

        refresh = RefreshToken.for_user(user)
        if not remember_device:
            refresh.set_exp(lifetime=timedelta(minutes=15))

        data = {
            "message": "Login successful",
            "access": str(refresh.access_token),
            "user": MeSerializer(user).data,
        }
        response = Response(data, status=status.HTTP_200_OK)
        max_age = int(timedelta(days=7).total_seconds()) if remember_device else int(timedelta(minutes=15).total_seconds())
        response.set_cookie(
            key="hmis_refresh",
            value=str(refresh),
            max_age=max_age,
            httponly=True,
            secure=True,
            samesite="Strict",
            path="/api/auth/",
        )
        return response


class LogoutAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        refresh_token = request.data.get("refresh") or request.COOKIES.get("hmis_refresh")
        if refresh_token:
            token = RefreshToken(refresh_token)
            token.blacklist()
        logout(request)
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        response.delete_cookie("hmis_refresh", path="/api/auth/")
        return response


class MeAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(MeSerializer(request.user).data, status=status.HTTP_200_OK)
class ForgotPasswordAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        if not email:
            return Response({"message": "Email is required"}, status=status.HTTP_400_BAD_REQUEST)
        from .models import User
        from django.contrib.auth.tokens import default_token_generator
        from django.utils.http import urlsafe_base64_encode
        from django.utils.encoding import force_bytes
        from django.core.mail import send_mail
        from django.conf import settings
        user = User.objects.filter(email=email).first()
        if not user:
            return Response({"message": "If that email exists, a reset link has been sent."}, status=status.HTTP_200_OK)
        uid = urlsafe_base64_encode(force_bytes(user.pk))
        token = default_token_generator.make_token(user)
        reset_link = f"http://localhost:3000/reset-password?uid={uid}&token={token}"
        send_mail(
            subject="Password Reset Request",
            message=f"Click the link below to reset your password:\n\n{reset_link}\n\nThis link expires in 24 hours.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email],
            fail_silently=False,
        )
        return Response({"message": "If that email exists, a reset link has been sent."}, status=status.HTTP_200_OK)

class ResetPasswordAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        uid = request.data.get("uid")
        token = request.data.get("token")
        new_password = request.data.get("new_password")
        if not all([uid, token, new_password]):
            return Response({"message": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)
        from django.contrib.auth.tokens import default_token_generator
        from django.utils.http import urlsafe_base64_decode
        from django.utils.encoding import force_str
        from .models import User
        try:
            user_id = force_str(urlsafe_base64_decode(uid))
            user = User.objects.get(pk=user_id)
        except Exception:
            return Response({"message": "Invalid reset link"}, status=status.HTTP_400_BAD_REQUEST)
        if not default_token_generator.check_token(user, token):
            return Response({"message": "Reset link is invalid or has expired"}, status=status.HTTP_400_BAD_REQUEST)
        user.set_password(new_password)
        user.save()
        return Response({"message": "Password reset successful"}, status=status.HTTP_200_OK)

