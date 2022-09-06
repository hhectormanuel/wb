from django.urls import path
from .views import NotificationAPIView

app_name = 'notificacion'

urlpatterns = [
    path('notification/', NotificationAPIView.as_view(), name='notification')
]