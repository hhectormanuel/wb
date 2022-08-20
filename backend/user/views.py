from .serializer import UserSerializer, UserExtendSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, GenericAPIView, ListAPIView
from django.contrib.auth.models import User
from .models import UserExtend

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from post.serializer import PostSerializer
from post.models import Post


from rest_framework_simplejwt.authentication import JWTAuthentication

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

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


@api_view(['GET'])
##@permission_classes((IsAuthenticated,))
def UserApiView(request, slug):
    if request.method == 'GET':
        userExtend = UserExtend.objects.get(slug = slug)
        userSerializer = UserExtendSerializer(userExtend)
        userSerializer2 = UserSerializer(User.objects.get(id = userSerializer.data.get('user')))
        #posts = PostSerializer(Post.objects.all(), many=True)
        posts = PostSerializer(Post.objects.filter(author = User.objects.first()), many=True)
        return Response({
            'name':userSerializer.data.get('name'),
            'profile_img' : userSerializer.data.get('profile_image'),
            'account_created': userSerializer.data.get('account_created'),
            'follows': userSerializer.data.get('follows'),
            'user' : userSerializer2.data,
            'posts' : posts.data
        }, status=status.HTTP_200_OK)
