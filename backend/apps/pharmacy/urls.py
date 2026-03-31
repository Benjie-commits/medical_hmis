from rest_framework.routers import DefaultRouter
from .views import MedicationOrderViewSet

router = DefaultRouter()
router.register("orders", MedicationOrderViewSet, basename="medication-orders")
urlpatterns = router.urls
