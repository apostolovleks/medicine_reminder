from django.shortcuts import render
from rest_framework import generics
from .models import Reminder
from .serializers import ReminderSerializer

# Create your views here.
class ReminderView(generics.CreateAPIView):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer