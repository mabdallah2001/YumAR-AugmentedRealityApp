from django.shortcuts import render

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.

from models import MenuItem

@api_view(['GET'])
def get_menu_items(request):
    if request.method == 'GET':
        data = MenuItem.objects.all()
        return Response(data)

    return Response(status=status.HTTP_400_BAD_REQUEST)

