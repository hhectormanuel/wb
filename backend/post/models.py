from django.db import models
from user.models import UserExtend
from django.contrib.auth.models import User

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

    def __str__(self):
        return '{} by {}'.format(self.title, self.author.username)

    def get_likes(self):
        likes = len(self.postlike_set.all())
        return likes

    def get_comments(self):
        comments = len(self.comment_set.all())
        return comments


class PostImgs(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    images = models.ImageField()



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


class CommentLike(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE)

