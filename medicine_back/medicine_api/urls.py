from rest_framework.routers import SimpleRouter
from medicine_api import views



router = SimpleRouter()
router.register('reminder', views.ReminderView)

urlpatterns = [
]

urlpatterns += router.urls
