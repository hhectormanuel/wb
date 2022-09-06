from rest_framework import serializers
from .models import Notificacion
from user.models import UserExtend


def userPhoto(instance):
    user = UserExtend.objects.get(user = instance.author)
    return user.profile_image

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notificacion
        fields = ('content', 'link', 'author')

    def to_representation(self, instance):
        return {
            'link' : instance.link,
            'content' : instance.content,
            'author' : instance.author.username,
            'author_photo' : userPhoto(instance)

        }

