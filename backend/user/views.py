from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .serializer import UserSerializer, UserExtendSerializer
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import UserExtend



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

