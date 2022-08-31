from rest_framework import serializers

from user.models import UserExtend
from .models import Category, Post, PostImgs, PostLike, Comment

def commentPost(instance):
    array = []
    comments = Comment.objects.filter(id = instance.id)
    for comment in comments:
        slug = UserExtend.objects.get(user = comment.author.id)
        array.append({
            'user_id' : comment.author.id,
            'username': comment.author.username,
            'user_slug' : slug.slug,
            'user_img' : slug.profile_image,
            'post_id' : comment.post.id,
            'post_slug' : comment.post.slug,
            'comment_id': comment.id,
            'content_comment' : comment.content,
            })
    return array


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'

    def to_representation(self, instance):
        #return super().to_representation(instance)
        return commentPost(instance)

class PostLikesSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = '__all__'

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'category_name', 'slug']

class PostImgsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostImgs
        fiels = ('_all_',)

class LikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = '__all__'

def instancia(self, instance):
    post = Post.objects.get(id = instance.id)
    array = []
    for img in post.postimgs_set.all():
        array.append(img.image)
    return array

def likePost(self, instance):
    array = []
    likes = PostLike.objects.filter(post = instance.id)
    for like in likes:
        slug = UserExtend.objects.get(user = like.author.id)
        array.append({'user_id' : like.author.id, 'username': like.author.username, 'user_slug' : slug.slug, 'user_img' : slug.profile_image})
    return array

def autor_img(instance):
    autor = UserExtend.objects.get(user = instance.author)
    return autor.profile_image

def comments(instance):
    array = []
    print(instance.comments())
    for comment in instance.comments():
        print(comment)
        
        user = UserExtend.objects.get(user = comment.author.id)
        print(user)
        array.append({
            'user_id' : comment.author.id,
            'username': comment.author.username,
            'user_slug' : user.slug,
            'user_img' : user.profile_image,
            'post_id' : comment.post.id,
            'post_slug' : comment.post.slug,
            'comment_id': comment.id,
            'content_comment' : comment.content,
        })
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
            'people_like' : likePost(self, instance),
            'slug' : instance.slug,
            'author_id': instance.author.id,
            'author_username': instance.author.username,
            'author_img' : autor_img(instance),
            'author_slug': UserExtend.objects.get(user = instance.author).slug,
            'category_id': instance.category.id,
            'category_name' : instance.category.category_name,
            'images': instancia(self, instance),
            'comments' : comments(instance)
        }

