from math import fabs
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from  app.models import Order
from django.http import JsonResponse
from app.models import Restaurant


# Create your views here.
@require_http_methods(['GET'])
def example_route(request):
    data = list(Restaurant.objects.values())
    return JsonResponse(data, safe=False, status=200)

@require_http_methods(['GET'])
def getOrder(request):
    data = list(Order.objects.values())
    return JsonResponse(data, safe=False, status=200)
