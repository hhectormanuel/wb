from django.db import models
from user.models import UserExtend
from django.contrib.auth.models import User
import datetime
from django.db.models.signals import post_save
# Create your models here.

class Category(models.Model):

    category_name = models.CharField(max_length=50)
    slug = models.SlugField(null=True, blank=True, unique=True,)

    

    def __str__(self):
        return self.category_name

class Post(models.Model):
    title = models.CharField(max_length=40, null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, null=False)
    description = models.TextField(null=True, max_length=255)
    post_created = models.DateTimeField(auto_now_add=True)

    slug = models.SlugField(unique=True)

    def __str__(self):
        return '{} by {}'.format(self.title, self.author.username)

    def get_likes(self):
        likes = len(self.postlike_set.all())
        return likes

    def get_comments(self):
        comments = len(self.comment_set.all())
        return comments
    
    def people_like(self):
        return self.postlike_set.all()


class PostImgs(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    image = models.CharField(max_length=400)



class Comment(models.Model):
    content = models.CharField(max_length=255)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return '{} by {}'.format(self.content, self.author.username)

    def get_comment_likes(self):
        likes = len(self.commentlike_set.all())
        return likes

class PostLike(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return 'like to {}'.format(self.post)


class CommentLike(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)



# def add_post_slug(sender, instance, created,  **kwargs):
#     if created:
#         post_created = datetime.datetime.now()
#         slug_post = Post.objects.get(id = instance.id)
#         slug_post.slug = 'post/{}{}'.format(instance.author.username, str(post_created).replace('-','').replace(' ', '').replace('.', '').replace(':', ''))
#         slug_post.save()
# post_save.connect(add_post_slug, Post)