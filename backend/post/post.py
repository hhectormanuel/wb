from post.serializer import PostSerializer
from rest_framework.response import Response
from rest_framework import status
import datetime
from post.models import PostImgs, Post

def post_category_user(self, request, *args, **kwargs):
    now = datetime.datetime.now()
    slug = '{}_{}'.format(request.user.username, str(now).replace('-','').replace(' ', '').replace('.', '').replace(':', ''))
    print(slug)
    data = {
            'author' : request.user.id,
            'title' : request.data['title'],
            'description' : request.data['description'],
            'category' : request.data['category'],
            'slug' : slug
        }
    images = request.data['image']
    #img = ['https://i.blogs.es/860ee9/togg4-1-/840_560.jpg', 'https://www.chevrolet.com.mx/content/dam/chevrolet/na/mx/es/index/performance/2022-camaro-coupe/colorizer/jellys/01-images/red-hot.jpg?imwidth=960']
    post_serializer = PostSerializer(data=data)
    if post_serializer.is_valid():
        post_serializer.save()
        post = Post.objects.get(slug = slug)
        for image in images:
            PostImgs.objects.create(
                post = post,
                image = image
            )
        return Response({'post': post_serializer.data}, status=status.HTTP_201_CREATED)
    return Response({'mal':'errores'}, status=status.HTTP_400_BAD_REQUEST)