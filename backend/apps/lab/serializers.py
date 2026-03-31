from rest_framework import serializers
from .models import LabOrder


class LabOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = LabOrder
        fields = "__all__"
