from django.urls import path
from .views import (
    MetricsAPIView,
    doctor_dashboard,
    nurse_dashboard,
    lab_dashboard,
    manager_dashboard,
    pharmacist_dashboard,
    receptionist_dashboard,
    patient_dashboard   
)
urlpatterns = [
    path("metrics", MetricsAPIView.as_view(), name="admin-metrics"),
    path("doctor/", doctor_dashboard),
    path("nurse/", nurse_dashboard),
    path("lab/", lab_dashboard),
    path("manager/", manager_dashboard),
    path("pharmacist/", pharmacist_dashboard),
    path("receptionist/", receptionist_dashboard),
    path("patient/", patient_dashboard),
]