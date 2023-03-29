from django.contrib import admin
from .models import Reminder

# Register your models here.


class ReminderAdmin(admin.ModelAdmin):
    list = (
        'user',
        'pill_name',
        'description',
        'periodicity_date_time',
        'last_date_time',
    )


admin.site.register(Reminder, ReminderAdmin)
