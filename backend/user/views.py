from .serializer import UserSerializer, UserExtendSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView
from django.contrib.auth.models import User
from .models import UserExtend

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated


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



@api_view(['GET'])
@permission_classes((IsAuthenticated,))
def UserApiView(request, slug):
    permission_classes = (IsAuthenticated,)
    if request.method == 'GET':
        userExtend = UserExtend.objects.get(slug = slug)
        userSerializer = UserExtendSerializer(userExtend)
        userSerializer2 = UserSerializer(User.objects.get(id = userSerializer.data.get('user')))
        return Response({
            'name':userSerializer.data.get('name'),
            'profile_img' : userSerializer.data.get('profile_image'),
            'account_created': userSerializer.data.get('account_created'),
            'follows': userSerializer.data.get('follows'),
            'user' : userSerializer2.data
        }, status=status.HTTP_200_OK)
