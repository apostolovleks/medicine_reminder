from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Reminder(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    pill_name = models.CharField(max_length=100, default="")
    description = models.CharField(max_length=500, default="")
    periodicity_date_time = models.DateTimeField()
    last_date_time = models.DateTimeField()

    def __str__(self) -> str:
        return self.pill_name