from django.urls import path

from .views import LoginAPIView, LogoutAPIView, MeAPIView, ForgotPasswordAPIView, ResetPasswordAPIView


urlpatterns = [
    path("login", LoginAPIView.as_view(), name="auth-login"),
    path("logout", LogoutAPIView.as_view(), name="auth-logout"),
    path("users/me", MeAPIView.as_view(), name="users-me"),
    path("forgot-password", ForgotPasswordAPIView.as_view(), name="auth-forgot-password"),
    path("reset-password", ResetPasswordAPIView.as_view(), name="auth-reset-password"),
]
