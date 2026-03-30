from django.conf import settings
from django.db import models
from apps.common.models import TimeStampedUUIDModel


class Patient(TimeStampedUUIDModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    mrn = models.CharField(max_length=40, unique=True)
    first_name = models.CharField(max_length=120)
    last_name = models.CharField(max_length=120)
    date_of_birth = models.DateField()
    sex = models.CharField(max_length=20)
    blood_group = models.CharField(max_length=8, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    emergency_contact = models.CharField(max_length=120, blank=True)
    address = models.TextField(blank=True)

    class Meta:
        db_table = "patients"
        indexes = [models.Index(fields=["mrn", "last_name"])]
