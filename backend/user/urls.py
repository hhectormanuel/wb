from django.conf.urls.static import static
from django.urls import path
from django.conf import settings
from .views import UserApiView, MyTokenObtainPairView, SingUp, PruebaGenericAPIView

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name='user'

urlpatterns = [
    path('profile/<slug:slug>', UserApiView, name='profile'),
    path('signup/', SingUp.as_view()),
    path('prueba/', PruebaGenericAPIView.as_view()),


    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)