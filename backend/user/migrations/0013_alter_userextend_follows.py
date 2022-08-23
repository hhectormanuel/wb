# Generated by Django 4.1 on 2022-08-23 00:40

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('user', '0012_alter_userextend_phone_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userextend',
            name='follows',
            field=models.ManyToManyField(blank=True, related_name='follows', to=settings.AUTH_USER_MODEL),
        ),
    ]