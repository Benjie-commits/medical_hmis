from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Appointment
from .serializers import AppointmentSerializer
from django.http import JsonResponse

def doctor_dashboard(request):
    data = {
        "today_patients": 14,
        "pending_notes": 8,
        "consults_left": 3,
        "patient_satisfaction": "92%",
        "queue": [
            {"token": "#101", "patient": "Nancy Kato", "department": "Cardiology", "arrival_time": "08:30 AM", "status": "Waiting"},
            {"token": "#102", "patient": "Paul Ogwang", "department": "Cardiology", "arrival_time": "09:10 AM", "status": "In Consult"},
            {"token": "#103", "patient": "Esther Namutebi", "department": "Cardiology", "arrival_time": "09:45 AM", "status": "Waiting"},
        ],
    }
    return JsonResponse(data)

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.select_related("patient", "provider", "booked_by").all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]