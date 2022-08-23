from django.conf.urls.static import static
from django.urls import path
from django.conf import settings
from .views import UserApiView, MyTokenObtainPairView, SingUp, PruebaListAPIView, ProfileAPIView, PruebaPost

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

app_name='user'

urlpatterns = [
    path('<slug:slug>', ProfileAPIView.as_view(), name='profile'),
    #path('<slug:slug>', UserApiView, name='profile'),
    path('signup/', SingUp.as_view(), name='signup'),
    path('prueba/', PruebaListAPIView.as_view()),
    path('prueba/post', PruebaPost.as_view()),


    path('api/token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]+static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)