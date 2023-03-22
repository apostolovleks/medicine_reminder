from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('medicine_api.urls')),
    path('', include('frontend.urls')),
]
