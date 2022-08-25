from .models import UserExtend
from django.contrib.auth.models import User

class Follow_followers():
    def follow(serializer):
        follows = []
        for follow in serializer.data.get('follows'):
            followuser = User.objects.get(id = follow)
            user ={
                'id' : followuser.id,
                'username': followuser.username,
                'username_slug' : UserExtend.objects.get(user = followuser).slug
            }
            follows.append(user)
        return follows


    def follower(serializer):
        followers = []
        for follower in serializer.data.get('followers'):
            followuser = User.objects.get(id = follower)
            user ={
                'id' : followuser.id,
                'username': followuser.username,
                'username_slug' : UserExtend.objects.get(user = followuser).slug
            }
            followers.append(user)
        return followers