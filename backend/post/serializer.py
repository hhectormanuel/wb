from rest_framework import serializers
from .models import Category, Post

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['category_name']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('__all__')