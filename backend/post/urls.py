from django.urls import path
from .views import CategoriaListAPIView, PostAPIVIew, CategoryAPIView

app_name = 'post'

urlpatterns = [
    path('category/', CategoriaListAPIView.as_view()),
    path('category/<slug:slug>', CategoryAPIView.as_view()),
    path('post/', PostAPIVIew.as_view()),
]