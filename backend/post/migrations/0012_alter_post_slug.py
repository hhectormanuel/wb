# Generated by Django 4.1 on 2022-08-23 22:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('post', '0011_alter_post_slug'),
    ]

    operations = [
        migrations.AlterField(
            model_name='post',
            name='slug',
            field=models.SlugField(default=123, unique=True),
            preserve_default=False,
        ),
    ]