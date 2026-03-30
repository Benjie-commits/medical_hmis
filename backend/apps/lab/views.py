from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import LabOrder
from .serializers import LabOrderSerializer


class LabOrderViewSet(viewsets.ModelViewSet):
    queryset = LabOrder.objects.select_related("patient").all()
    serializer_class = LabOrderSerializer
    permission_classes = [IsAuthenticated]
