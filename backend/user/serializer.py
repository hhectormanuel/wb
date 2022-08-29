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

def userExtend(instance):
    print(instance)
    user = User.objects.get(id = instance.user.id)
    userdata = {'username':user.username, 'first_name':user.first_name, 'last_name' : user.last_name, 'email':user.email}
    return userdata

class UserComplete(ModelSerializer):
    class Meta:
        model = UserExtend
        fields = '__all__'

    def to_representation(self, instance):
        
        return {
            'user' : userExtend(instance),
            'phone_number' : instance.phone_number,
            'profile_image' : instance.profile_image,
            'account_created' : instance.account_created,
            'follows' : instance.get_follows(),
            'followers' : instance.get_follows(),
            'slug': instance.slug
            }