from rest_framework import serializers
from .models import MedicationOrder


class MedicationOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = MedicationOrder
        fields = "__all__"
