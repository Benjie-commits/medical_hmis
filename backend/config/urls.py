from django.contrib import admin
from django.shortcuts import render
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from apps.accounts.views import MeAPIView

def home(request):
    return render(request, "login.html")

def doctor_page(request):
    return render(request, "doctor.html")

def nurse_page(request):
    return render(request, "nurse.html")

def patient_page(request):
    return render(request, "patient.html")

def lab_page(request):
    return render(request, "labtech.html")

def manager_page(request):
    return render(request, "manager.html")

def pharmacist_page(request):
    return render(request, "pharmacist.html")

def receptionist_page(request):
    return render(request, "receptionist.html")

urlpatterns = [
    # ===== FRONTEND ROUTES =====
    path("", home),
    path("doctor/", doctor_page),
    path("nurse/", nurse_page),
    path("patient/", patient_page),
    path("lab/", lab_page),
    path("manager/", manager_page),
    path("pharmacist/", pharmacist_page),
    path("receptionist/", receptionist_page),

    # ===== ADMIN =====
    path("admin/", admin.site.urls),

    # ===== API ROUTES =====
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema"), name="swagger-ui"),
    path("api/auth/", include("apps.accounts.urls")),
    path("api/users/me", MeAPIView.as_view(), name="users-me"),
    path("api/patients/", include("apps.patients.urls")),
    path("api/appointments/", include("apps.appointments.urls")),
    path("api/pharmacy/", include("apps.pharmacy.urls")),
    path("api/lab/", include("apps.lab.urls")),
    path("api/admin-dashboard/", include("apps.admin_dashboard.urls")),
]