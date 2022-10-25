from math import fabs
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Restaurant

# Create your views here.

from .models import MenuItem

@require_http_methods(['GET'])
def get_menu_items(request):
    data = list(MenuItem.objects.all())
    return JsonResponse(data, safe=False, status=200)

@require_http_methods(['GET'])
def example_route(request):
    data = list(Restaurant.objects.values())
    return JsonResponse(data, safe=False, status=200)
