import profile
from pyexpat import model
from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from .models import UserExtend

class UserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password', 'first_name', 'last_name', 'email',)

    
    def create(self, validated_data):
        user = User(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user

class UserExtendSerializer(ModelSerializer):
    class Meta:
        model = UserExtend
        fields = '__all__'