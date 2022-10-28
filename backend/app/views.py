from math import fabs
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
from .models import Restaurant,MenuItem

# Create your views here.
@require_http_methods(['GET'])
def example_route(request):
    data = list(Restaurant.objects.values())
    return JsonResponse(data, safe=False, status=200)

@require_http_methods(['GET'])
def get_menu_item(request,id):
    data = list(MenuItem.objects.filter(id=id).values())
    print (data)
    return JsonResponse(data, safe=False, status=200)
