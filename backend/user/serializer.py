from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import UserExtend

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('password', 'username', 'first_name', 'last_name', 'email',)

    def save(self, **kwargs):
        return super().save(**kwargs)

class UserExtendSerializer(ModelSerializer):
    class Meta:
        model = UserExtend
        fields = '__all__'
