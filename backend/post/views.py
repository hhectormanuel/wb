from rest_framework.generics import ListAPIView
from .serializer import CategoriaSerializer
from .models import Category
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializer import PostSerializer
from rest_framework.permissions import IsAuthenticated


class CategoriaListAPIView(ListAPIView):
    serializer_class = CategoriaSerializer
    queryset = serializer_class.Meta.model.objects.all()


class PostAPIVIew(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return Response({}, status=status.HTTP_200_OK)
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
        return Response({}, status=status.HTTP_200_OK)
