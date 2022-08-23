from django.urls import path
from .views import CategoriaListAPIView, PostAPIVIew

app_name = 'post'

urlpatterns = [
    path('category/', CategoriaListAPIView.as_view()),
    path('post/', PostAPIVIew.as_view()),
]