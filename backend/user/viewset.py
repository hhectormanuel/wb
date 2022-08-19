from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import api_view
from .serializer import UserSerializer
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.response import Response
from django.contrib.auth.hashers import make_password


@api_view(['GET', 'POST'])
def pruebaView(request):
    if request.method == 'GET':
        user = User.objects.all()
        userSerializer = UserSerializer(user, many = True)
        return Response(userSerializer.data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        userSerializer = UserSerializer(data=request.data)
        if userSerializer.is_valid():
            password = make_password(userSerializer.validated_data['password'])
            userSerializer.validated_data['password'] = password
            userSerializer.save()
            


            return Response(userSerializer.data, status=status.HTTP_201_CREATED)
        return Response(userSerializer.errors, status=status.HTTP_400_BAD_REQUEST)
