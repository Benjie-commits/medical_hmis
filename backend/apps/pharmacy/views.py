from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import MedicationOrder
from .serializers import MedicationOrderSerializer


class MedicationOrderViewSet(viewsets.ModelViewSet):
    queryset = MedicationOrder.objects.select_related("patient").all()
    serializer_class = MedicationOrderSerializer
    permission_classes = [IsAuthenticated]
