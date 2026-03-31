from rest_framework.routers import DefaultRouter
from .views import LabOrderViewSet

router = DefaultRouter()
router.register("orders", LabOrderViewSet, basename="lab-orders")
urlpatterns = router.urls
