# Generated by Django 4.1.2 on 2022-10-25 13:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_staff_user'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='staff',
            name='username',
        ),
    ]
