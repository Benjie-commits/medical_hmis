from rest_framework.routers import DefaultRouter
from .views import AppointmentViewSet
from django.urls import path
from . import views

urlpatterns = [
    path("", views.doctor_dashboard),
]

router = DefaultRouter()
router.register("", AppointmentViewSet, basename="appointments")
urlpatterns += router.urls