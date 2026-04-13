from django.conf import settings
from django.db import models
from apps.common.models import TimeStampedUUIDModel
from apps.patients.models import Patient


class AppointmentStatus(models.TextChoices):
    SCHEDULED = "scheduled", "Scheduled"
    IN_PROGRESS = "in_progress", "In Progress"
    COMPLETED = "completed", "Completed"
    CANCELLED = "cancelled", "Cancelled"


class Appointment(TimeStampedUUIDModel):
    patient = models.ForeignKey(
        Patient,
        on_delete=models.PROTECT,
        related_name="appointments"
    )

    provider = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="provider_appointments"
    )

    booked_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.PROTECT,
        related_name="booked_appointments"
    )

    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField()

    status = models.CharField(
        max_length=20,
        choices=AppointmentStatus.choices,
        default=AppointmentStatus.SCHEDULED
    )

    reason = models.TextField(blank=True)

    class Meta:
        db_table = "appointments"
        indexes = [models.Index(fields=["starts_at", "status"])]

    def __str__(self):
        return f"{self.patient} - {self.starts_at}"