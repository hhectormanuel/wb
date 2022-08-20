from django.urls import path
from .views import CategoriaListAPIView

app_name = 'post'

urlpatterns = [
    path('category/', CategoriaListAPIView.as_view()),
]