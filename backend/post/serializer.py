from rest_framework import serializers
from .models import Category, Post, PostImgs

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name', 'slug']

class PostImgsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImgs
        fiels = ('_all_',)

def instancia(self, instance):
    post = Post.objects.get(id = instance.id)
    array = []
    for img in post.postimgs_set.all():
        array.append(img.images)
    return array

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'author', 'category')
    

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'title': instance.title,
            'description': instance.description,
            'author_id': instance.author.id,
            'author_username': instance.author.username,
            'category_id': instance.category.id,
            'category_name' : instance.category.category_name,
            'images': instancia(self, instance)
        }

