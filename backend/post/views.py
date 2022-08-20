from rest_framework.generics import ListAPIView
from .serializer import CategoriaSerializer
from .models import Category
from rest_framework.response import Response
from rest_framework import status


class CategoriaListAPIView(ListAPIView):
    serializer_class = CategoriaSerializer
    queryset = serializer_class.Meta.model.objects.all()
