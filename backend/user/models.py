from django.db import models
from django.contrib.auth.models import User
from django.core.validators import RegexValidator
from django.db.models.signals import post_save
import datetime
import os
from django.conf import settings

# Create your models here.



def profile_img(instance, imgName):
    path = 'image/profile/{}/{}'.format(instance.id, imgName)
    full_path = os.path.join(settings.MEDIA_ROOT, path)
    return full_path

phone_number_validator = RegexValidator(r'^[0-9]{10}$', 'Please write a valid number')

class UserExtend(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name=models.CharField(max_length=50)
    last_name=models.CharField(max_length=60)
    phone_number=models.FloatField(validators=[phone_number_validator] ,max_length=9999999999, unique=True, blank=True, null=True)
    ##phone number validator doesnt work
    profile_image=models.ImageField(upload_to=profile_img)
    account_created = models.DateTimeField(auto_now_add=True)
    follows = models.ManyToManyField(User, related_name='follows')

    def defaultSlug(self):
        return '{}{}'.format(self.user.username, str(self.account_created).replace('-','').replace(' ', '').replace('.', '').replace(':', ''))

    slug = models.SlugField(unique=True,default=defaultSlug, null=False, blank=False)


    def __str__(self):
        return self.slug

    def total_posts(self):
        posts = len(self.post_set.all())
        return posts
    
    ##def get_follows(self):
    ##    follows = len(self.follows)
    ##    return follows



def create_user(sender, instance, created,  **kwargs):
    if created:
        account_created = datetime.datetime.now()
        user = UserExtend.objects.create(
            user = instance,
            account_created = account_created,
            slug = '{}{}'.format(instance.username, str(account_created).replace('-','').replace(' ', '').replace('.', '').replace(':', ''))
        )
        user.save()
post_save.connect(create_user, User)