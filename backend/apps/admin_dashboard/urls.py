from django.urls import path
from .views import MetricsAPIView

urlpatterns = [
    path("metrics", MetricsAPIView.as_view(), name="admin-metrics"),
]
