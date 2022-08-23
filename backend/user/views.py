from .serializer import UserSerializer, UserExtendSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveUpdateDestroyAPIView
from django.contrib.auth.models import User
from .models import UserExtend

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from post.serializer import PostSerializer
from post.models import Post
from rest_framework.views import APIView


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

    def get(self, request):
        user = request.user
        serializer = UserSerializer(User.objects.all(), many=True)
        return Response(serializer.data)


class ProfileView(RetrieveUpdateDestroyAPIView):
    serializer_class = UserExtendSerializer
    queryset = serializer_class.Meta.model.objects.all()

class ProfileAPIView(APIView):
    def get(self, request, slug, *args, **kwargs):
        userExtend = UserExtend.objects.get(slug = slug)
        serializer = UserExtendSerializer(userExtend)
        userSerializer = UserSerializer(User.objects.get(id = serializer.data.get('user')))
        posts = PostSerializer(Post.objects.filter(author = userExtend.user), many=True)
        return Response({
            'name':serializer.data.get('name'),
            'profile_img' : serializer.data.get('profile_image'),
            'account_created': serializer.data.get('account_created'),
            'follows': serializer.data.get('follows'),
            'user' : userSerializer.data,
            'posts' : posts.data,
            'followers' : '',
        }, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        data = {
            'author' : request.user.id,
            'title' : request.data['title'],
            'description' : request.data['description'],
            'category' : request.data['category']
        }
        post_serializer = PostSerializer(data=data)
        if post_serializer.is_valid():
            post_serializer.save()
            return Response({
                'bien': 'todo saliio correctamente'
            })
        return Response({'error' : 'algo ha salido mal'}, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, *args, **kwargs):
        pass

