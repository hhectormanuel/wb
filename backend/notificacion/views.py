from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from .serializer import NotificationSerializer
from .models import Notificacion
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class NotificationAPIView(APIView):
    permission_classes = (IsAuthenticated,)    
    def get(self, request):
        instance = Notificacion.objects.filter(to=request.user).order_by('-id')
        serializer = NotificationSerializer(instance, many=True)
        return Response(serializer.data, status.HTTP_200_OK)