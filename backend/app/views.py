import json
from math import fabs
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login
from django.http import JsonResponse
from .models import Restaurant,MenuItem, Order
from django.core import serializers;
from django.contrib.auth.backends import ModelBackend
import uuid
from datetime import datetime


# Create your views here.

@require_http_methods(['GET'])
def get_menu_items(request):
    data_json = serializers.serialize("json", MenuItem.objects.all())
    return JsonResponse(data_json, safe=False, status=200)

@require_http_methods(['GET'])
def example_route(request):
    data = list(Restaurant.objects.values())
    return JsonResponse(data, safe=False, status=200)

@require_http_methods(['GET'])
def getOrder(request):
    data = list(Order.objects.values())
    return JsonResponse(data, safe=False, status=200)


def get_menu_item(request,id):
    data = list(MenuItem.objects.filter(id=id).values())
    print (data)
    return JsonResponse(data, safe=False, status=200)

@login_required
def whoami(request):
    return JsonResponse({"username": request.user.username, "is_admin": request.user.staff.is_admin})

@csrf_exempt
@require_http_methods(['POST'])
def log_in(request):
    data = json.loads(request.body)
    m = ModelBackend()
    user = m.authenticate(request, data["username"], data["password"])
    if user == None:
        return JsonResponse("Not authenticated", safe=False, status=403)
    login(request, user)
    return JsonResponse({"username": user.staff.username,
                         "is_admin": user.staff.is_admin}, status=200)

@csrf_exempt
@require_http_methods(['POST'])
def addOrder(request):
    data = json.loads(request.body)

    totalPrice = 0
    menuList = []
    restaurant = Restaurant.objects.get(id=1)
    menuIDs = data["menu-items"]
    for menuID in menuIDs:
        item = MenuItem.objects.get(id=menuID)
        totalPrice += item.price
        menuList.append(item)
    if (len(menuList) == 0):
        return JsonResponse("No items found in the order", safe=False, status=400)

    order = Order.objects.create( 
    order_number = uuid.uuid4(),
    time_created = datetime.now(),
    total = totalPrice,
    is_completed = False,
    restaurant = restaurant
    )
    order.menu_items.set(menuList)
    return JsonResponse({"msg": "ok"}, status=200)

