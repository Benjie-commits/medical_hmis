from django.db import models
from apps.common.models import TimeStampedUUIDModel
from apps.patients.models import Patient


class MedicationOrder(TimeStampedUUIDModel):
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT, related_name="medication_orders")
    medication_name = models.CharField(max_length=255)
    dosage = models.CharField(max_length=120)
    frequency = models.CharField(max_length=120)
    duration_days = models.PositiveIntegerField(default=1)
    is_dispensed = models.BooleanField(default=False)

    class Meta:
        db_table = "medication_orders"
