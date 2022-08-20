from .serializer import UserSerializer, UserExtendSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import status
from rest_framework.response import Response
from rest_framework.generics import CreateAPIView, GenericAPIView
from django.contrib.auth.models import User
from .models import UserExtend

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
import jwt

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


class PruebaGenericAPIView(GenericAPIView):
    serializer_class=UserSerializer
    #permission_classes = (IsAuthenticated,)
    
    def get(self, request, *args, **kwargs):
        token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjYxMDE1MDM4LCJpYXQiOjE2NjEwMTQ3MzgsImp0aSI6ImQ4YWFkNzFmOTk3OTQxZjNiNDA1MWJjNTFjMDI0OTM4IiwidXNlcl9pZCI6MSwidXNlcm5hbWUiOiJoZWN0b3IifQ.9hnhzHf0xPoOruxxH_JPIQLVP9tfNdmcQuWC_Sr39Qg'
        print(jwt.decode(jwt=token,algorithms=['HS256']))
        return Response({})



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
