from django.contrib.auth.models import AbstractUser
from django.db import models
from apps.common.models import TimeStampedUUIDModel


class UserRole(models.TextChoices):
    DOCTOR = "doctor", "Doctor"
    NURSE = "nurse", "Nurse"
    RECEPTIONIST = "receptionist", "Receptionist"
    PHARMACIST = "pharmacist", "Pharmacist"
    LAB_TECHNICIAN = "lab_technician", "Lab Technician"
    MANAGER = "manager", "Manager"
    PATIENT = "patient", "Student/Patient"


class User(AbstractUser, TimeStampedUUIDModel):
    role = models.CharField(max_length=32, choices=UserRole.choices)
    phone = models.CharField(max_length=20, blank=True)
    department = models.CharField(max_length=120, blank=True)
    is_active_staff = models.BooleanField(default=True)
    failed_attempts = models.PositiveIntegerField(default=0)
    locked_until = models.DateTimeField(null=True, blank=True)

    class Meta:
        db_table = "users"
