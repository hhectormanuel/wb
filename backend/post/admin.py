from django.contrib import admin
from .models import Post, PostImgs, PostLike, Comment, CommentLike, Category

# Register your models here.

admin.site.register(Post)
admin.site.register(PostImgs)
admin.site.register(PostLike)
admin.site.register(Comment)
admin.site.register(CommentLike)
admin.site.register(Category)