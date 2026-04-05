from django.shortcuts import render

def doctor_dashboard(request):
    return render(request, 'doctor.html')
def nurse_dashboard(request):
    return render(request, 'nurse.html')
def lab_dashboard(request):
    return render(request, 'labtech.html')

def manager_dashboard(request):
    return render(request, 'manager.html')

def pharmacist_dashboard(request):
    return render(request, 'pharmacist.html')

def receptionist_dashboard(request):
    return render(request, 'receptionist.html')
def patient_dashboard(request):
    return render(request, 'patient.html')
from django.db.models import Count
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from apps.accounts.permissions import IsFrontDeskOrManager
from apps.patients.models import Patient
from apps.appointments.models import Appointment


class MetricsAPIView(APIView):
    permission_classes = [IsAuthenticated, IsFrontDeskOrManager]

    def get(self, request):
        appointments_by_status = (
            Appointment.objects.values("status").annotate(total=Count("id")).order_by("status")
        )
        return Response({
            "patients_total": Patient.objects.count(),
            "appointments_total": Appointment.objects.count(),
            "appointments_by_status": list(appointments_by_status),
        })
