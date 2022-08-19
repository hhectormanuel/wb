from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializer import UserSerializer, UserExtendSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserExtend


from django.http import JsonResponse
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        token['username'] = user.username

        return token

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

@api_view(['GET'])
def getRoutes(request):
    routes = [
        'api/token',
        'apid/token/refresh'
    ]

    return Response(routes)



class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = serializer_class.Meta.model.objects.all()


@api_view(['GET', 'POST'])
def UserApiView(request, slug):
    if request.method == 'GET':
        userExtend = UserExtend.objects.get(slug = slug)
        user = userExtend.user
        userSerializer = UserExtendSerializer(userExtend)
        return Response(userSerializer.data, status=status.HTTP_200_OK)

