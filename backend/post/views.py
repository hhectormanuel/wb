from rest_framework.generics import ListAPIView, RetrieveAPIView, CreateAPIView

from .serializer import CategoriaSerializer, PostLikesSerializer
from .models import Category, Post, PostLike, Comment
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializer import PostSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated
from post.post import post_category_user
from datetime import datetime
from post.followposts import Posts as FriendPost
from notificacion.models import Notificacion


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
        posts = Post.objects.all()
        postSerializer = PostSerializer(posts, many=True)
        return Response(postSerializer.data, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        return post_category_user(self, request, *args, **kwargs)
        
from datetime import timedelta
timedelta(days=7)

class PopularPostListView(ListAPIView):
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request):
        week = datetime.now()-timedelta(days=7)
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
    permission_classes = (IsAuthenticated,)
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def list(self, request, *args, **kwargs):
        follows, followUsers, followPosts = FriendPost.get_data(self, request)
        posts = FriendPost.iterador(follows, followUsers, followPosts)
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)


class Postlikes(CreateAPIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = PostLikesSerializer
    

    def post(self, request, slug):
        post = Post.objects.get(slug = slug)
        content = '{} ha dado like a tu publicacion'.format(request.user.username)
        try:
            get = PostLike.objects.get(author = request.user, post = post)
            get.delete()
            notificacion = Notificacion.objects.get(author=request.user, content=content, link=slug, to=post.author)
            notificacion.delete()
            return Response({'like': 'borrado', 'notificacion' : 'borrada'})
        except:
            PostLike.objects.create(author = request.user, post = post)
            Notificacion.objects.create(author = request.user, content = content, link=slug, to = post.author)
            return Response({'like': 'creado', 'notificacion' : 'creada'})

class CommentPostAPIView(APIView):
    #permission_classes = (IsAuthenticated,)
    serializer_class = CommentSerializer

    def get(self, request, slug):
        post = Post.objects.get(slug = slug)
        comment = Comment.objects.filter(post = post)
        serializer = CommentSerializer(comment, many = True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, slug):
        content = '{} ha comentado tu publicacion'.format(request.user.username)
        post = Post.objects.get(slug=slug)
        if len(request.data.get('content')) <= 255:
            Comment.objects.create(
                content = request.data.get('content'),
                author= request.user,
                post = post
            )
            Notificacion.objects.create(author = request.user, content = content, link=slug, to = post.author)
            return Response({'comment':'the comment is done', 'notification' : 'the notification is made correctly'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'error' : 'the content cant be > 255'}, status=status.HTTP_400_BAD_REQUEST)