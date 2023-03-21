from django.db import models


# Create your models here.
class Reminder(models.Model):
    pill = models.CharField(max_length=100, default="")
    date_time = models.DateTimeField()
    description = models.CharField(max_length=500, default="")

