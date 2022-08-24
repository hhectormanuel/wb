from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializer import CategoriaSerializer
from .models import Category, Post
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from .serializer import PostSerializer
from rest_framework.permissions import IsAuthenticated
from post.post import post_category_user


class CategoriaListAPIView(ListAPIView):
    serializer_class = CategoriaSerializer
    queryset = serializer_class.Meta.model.objects.all()

class CategoryAPIView(APIView):
    def get(self, request, slug):
        category = Category.objects.get(slug = slug)
        post = Post.objects.filter(category = category)
        postserializer = PostSerializer(post, many = True)

        return Response(postserializer.data, status=status.HTTP_200_OK)


class CategoryRetriveApiView(RetrieveAPIView):
    serializer_class = ""

    



class PostAPIVIew(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request):
        return Response({'Informacion' : 'haz cargado el metodo get correctamente'}, status=status.HTTP_200_OK)
    def post(self, request, *args, **kwargs):
        return post_category_user(self, request, *args, **kwargs)        
            #buscarpost = Post.objects.get(author = request.user.id, title = request.data['title'])
            #print(buscarpost)
        


