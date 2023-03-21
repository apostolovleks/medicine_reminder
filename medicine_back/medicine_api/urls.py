from django.urls import path, include
from .views import ReminderView

urlpatterns = [
    path('', ReminderView.as_view())
]
