from rest_framework.viewsets import ModelViewSet
from .models import Reminder
from .serializers import ReminderSerializer

# Create your views here.

class ReminderView(ModelViewSet):
    queryset = Reminder.objects.all()
    serializer_class = ReminderSerializer