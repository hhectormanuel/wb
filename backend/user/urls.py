from django.conf.urls.static import static
from django.urls import path
from django.conf import settings
from .viewset import pruebaView
from .views import UserApiView, getRoutes, MyTokenObtainPairView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name='user'

urlpatterns = [
    path('', getRoutes, name='routes'),
    path('profile/<slug:slug>', UserApiView, name='profile'),


    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)