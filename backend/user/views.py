from .serializer import UserSerializer, UserExtendSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from django.contrib.auth.models import User
from .models import UserExtend
from .follow import Follow_followers

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from post.serializer import PostSerializer
from post.models import Post
from rest_framework.views import APIView
from post.post import post_category_user


from rest_framework_simplejwt.authentication import JWTAuthentication

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username
        token['slug'] = UserExtend.objects.get(user=user).slug

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


## Login CreateAPIView
class SingUp(CreateAPIView):
    serializer_class=UserSerializer


## clase de prueba para probar funcionalidades en el sitio
class PruebaListAPIView(ListAPIView):
    serializer_class = UserSerializer
    queryset = serializer_class.Meta.model.objects.all()
    #permission_classes = (IsAuthenticated,)


class ProfileView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserExtendSerializer
    queryset = serializer_class.Meta.model.objects.all()
    permission_classes = (IsAuthenticated,)

class ProfileAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request, slug, *args, **kwargs):
        userExtend = UserExtend.objects.get(slug = slug)
        serializer = UserExtendSerializer(userExtend)
        userSerializer = UserSerializer(User.objects.get(id = serializer.data.get('user')))
        posts = PostSerializer(Post.objects.filter(author = userExtend.user).order_by('-id'), many=True)
        return Response({
            'name':serializer.data.get('name'),
            'profile_img' : serializer.data.get('profile_image'),
            'account_created': serializer.data.get('account_created'),
            'follows': Follow_followers.follow(serializer),
            'followers' : Follow_followers.follower(serializer),
            'user' : userSerializer.data,
            'posts' : posts.data,
        }, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        return post_category_user(self, request, *args, **kwargs)
    
    def put(self, request, *args, **kwargs):
        pass

##vista para hacer follow/unfollow
class FollowAPIView(APIView):
    permission_classes = (IsAuthenticated,)
    def post(self, request, slug, *args, **kwargs):
        user = request.user
        myUser = UserExtend.objects.get(user = user)
        follow_to = UserExtend.objects.get(slug = slug)

        if follow_to.user in myUser.follows.all():
            myUser.follows.remove(follow_to.user)
            follow_to.followers.remove(user)
            return Response({'correcto' : 'haz dejado de seguir'}, status.HTTP_200_OK)
        else:
            myUser.follows.add(follow_to.user)
            follow_to.followers.add(user)
            return Response({'correcto' : 'haz comenzado a seguir'}, status.HTTP_200_OK)
