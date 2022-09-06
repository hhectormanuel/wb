from django.db import models

from django.contrib.auth.models import User
from post.models import Post, PostLike

# Create your models here.

class Notificacion(models.Model):
    to = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(max_length=300)
    link = models.CharField(max_length=500)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author')

    def __str__(self):
        return self.content

