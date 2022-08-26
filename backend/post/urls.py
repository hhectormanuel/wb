from django.urls import path
from .views import CategoriaListAPIView, PopularPostListView, PostAPIVIew, CategoryAPIView, PopularPostListView, SeguidosPostListView, Postlikes

app_name = 'post'

urlpatterns = [
    path('category/', CategoriaListAPIView.as_view(), name='category'),
    path('category/<slug:slug>', CategoryAPIView.as_view(), name='category-slug'),
    path('post/', PostAPIVIew.as_view(), name='post'),
    path('post/popular/', PopularPostListView.as_view(), name='popular'),
    path('post/follows/', SeguidosPostListView.as_view(), name='post-follows'),
    path('like/<slug:slug>', Postlikes.as_view(), name='post-likes')
]