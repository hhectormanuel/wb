# Generated by Django 4.1 on 2022-08-23 00:34

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0009_alter_userextend_follows'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userextend',
            name='phone_number',
            field=models.FloatField(blank=True, max_length=9999999999, null=True, unique=True, validators=[django.core.validators.RegexValidator('{10}$', 'Please write a valid number')]),
        ),
    ]
