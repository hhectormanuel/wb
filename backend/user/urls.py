from django.conf.urls.static import static
from django.urls import path
from django.conf import settings
from .viewset import pruebaView
from .views import UserApiView

app_name='user'

urlpatterns = [
    path('profile/<slug:slug>', UserApiView, name='profile')
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)