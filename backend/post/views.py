from genericpath import exists
from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView

from user.models import UserExtend, User
from .serializer import CategoriaSerializer, PostLikesSerializer
from .models import Category, Post, PostLike
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializer import PostSerializer
from rest_framework.permissions import IsAuthenticated
from post.post import post_category_user
from datetime import datetime
from post.followposts import Posts as FriendPost


class CategoriaListAPIView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CategoriaSerializer
    queryset = serializer_class.Meta.model.objects.all()

class CategoryAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, slug):
        category = Category.objects.get(slug = slug)
        post = Post.objects.filter(category = category)
        postserializer = PostSerializer(post, many = True)

        return Response(postserializer.data, status=status.HTTP_200_OK)


class CategoryRetriveApiView(RetrieveAPIView):
    serializer_class = ""

    



class PostAPIVIew(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return Response({'Informacion' : 'haz cargado el metodo get correctamente'}, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        return post_category_user(self, request, *args, **kwargs)
        
from datetime import timedelta
timedelta(days=7)

class PopularPostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request):
        week = datetime.now()-timedelta(hours=5)
        recents = Post.objects.filter(post_created__gt=week)
        likes = []
        posts = []
        array =[]
        for post in recents:
            posts.append([post, post.get_likes()])
            likes.append(post.get_likes())
        most_likes = list(reversed(sorted(likes)))
        for most in most_likes:
            for post in posts:
                if post[1] == most and post[0] not in array:
                    array.append(post[0])
        serializer = PostSerializer(array, many=True)
        return Response(serializer.data)

class SeguidosPostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request, *args, **kwargs):
        follows, followUsers, followPosts = FriendPost.get_data(self, request)
        posts = FriendPost.iterador(follows, followUsers, followPosts)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class Postlikes(CreateAPIView):
    serializer_class = PostLikesSerializer

    def post(self, request, slug):
        post = Post.objects.get(slug = slug)
        try:
            get = PostLike.objects.get(author = request.user, post = post)
            get.delete()
            return Response({'like': 'borrado'})
        except:
            PostLike.objects.create(author = request.user, post = post)
            return Response({'like': 'creado'})