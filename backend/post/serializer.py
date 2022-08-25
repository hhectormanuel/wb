from rest_framework import serializers

from user.models import UserExtend
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
        array.append(img.image)
    return array


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id', 'title', 'description', 'author', 'category', 'slug', 'post_created')
    

    def to_representation(self, instance):
        return {
            'id': instance.id,
            'title': instance.title,
            'description': instance.description,
            'post_created' : instance.post_created,
            'post_likes' : instance.get_likes(),
            'slug' : instance.slug,
            'author_id': instance.author.id,
            'author_username': instance.author.username,
            'author_slug': UserExtend.objects.get(user = instance.author).slug,
            'category_id': instance.category.id,
            'category_name' : instance.category.category_name,
            'images': instancia(self, instance)
        }

