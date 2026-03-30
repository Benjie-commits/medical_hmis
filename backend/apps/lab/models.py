from django.db import models
from apps.common.models import TimeStampedUUIDModel
from apps.patients.models import Patient


class LabOrderStatus(models.TextChoices):
    ORDERED = "ordered", "Ordered"
    COLLECTED = "collected", "Collected"
    COMPLETED = "completed", "Completed"


class LabOrder(TimeStampedUUIDModel):
    patient = models.ForeignKey(Patient, on_delete=models.PROTECT, related_name="lab_orders")
    test_name = models.CharField(max_length=255)
    status = models.CharField(max_length=20, choices=LabOrderStatus.choices, default=LabOrderStatus.ORDERED)
    result = models.TextField(blank=True)

    class Meta:
        db_table = "lab_orders"
