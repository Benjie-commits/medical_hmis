from django.contrib import admin
from django.urls import include, path
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from apps.accounts.views import MeAPIView

urlpatterns = [
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