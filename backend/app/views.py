from math import fabs
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Restaurant

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

@require_http_methods(['GET'])
def example_route(request):
    data = list(Restaurant.objects.values())
    return JsonResponse(data, safe=False, status=200)
