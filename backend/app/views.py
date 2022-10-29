import json
from math import fabs
from unicodedata import category, name
from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.decorators import login_required
from django.contrib.auth import login, logout
from django.http import JsonResponse, HttpResponse
from .models import Category, Restaurant,MenuItem, Staff
from django.core import serializers;
from django.contrib.auth.models import User

from .models import Restaurant, MenuItem
from django.contrib.auth.backends import ModelBackend

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
def get_menu_item(request,id):
    data = list(MenuItem.objects.filter(id=id).values())
    print (data)
    return JsonResponse(data, safe=False, status=200)

@require_http_methods(['GET'])
def get_menu_categories(request):
    data = list(Category.objects.values())
    return JsonResponse(data, safe=False)

@require_http_methods(['GET'])
def get_category_items(request, catId):
    data = list(MenuItem.objects.filter(category=catId).values())
    return JsonResponse(data, safe=False)

@login_required
@require_http_methods(['GET'])
def whoami(request):
    return JsonResponse({"username": request.user.username, "is_admin": request.user.staff.is_admin})

@login_required
@require_http_methods(['GET'])
def get_restaurant_people(request):
    if not request.user.staff.is_admin:
        return JsonResponse("Unauthorized", safe=False, status=403)
    restaurantPeople = list(Staff.objects.filter(restaurant=request.user.staff.restaurant).values())
    return JsonResponse(restaurantPeople, safe=False, status=200)

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
@login_required
def log_out(request):
    logout(request)
    return JsonResponse({"msg": "logout"}, status=200)

@csrf_exempt
@require_http_methods(['POST'])
@login_required
def new_category(request):
    if not request.user.staff.is_admin:
        return JsonResponse("Unauthorized", safe=False, status=403)
    data = json.loads(request.body)
    Category.objects.create(name=data["name"])
    return JsonResponse({"msg": "ok"}, status=200)

@csrf_exempt
@require_http_methods(['POST'])
@login_required
def new_menu_item(request, catId):
    if not request.user.staff.is_admin:
        return JsonResponse("Unauthorized", safe=False, status=403)
    category = Category.objects.get(id=catId)
    if (category == None):
        return JsonResponse("Category not found", safe=False, status=400)
    data = json.loads(request.body)
    MenuItem.objects.create(name=data["name"], category=category, price=data["price"], link_3d_model=data["model"])
    return JsonResponse({"msg": "ok"}, status=200)

@csrf_exempt
@require_http_methods(['POST'])
@login_required
def register(request):
    if not request.user.staff.is_admin:
        return JsonResponse("Unauthorized", safe=False, status=403)
    data = json.loads(request.body)
    user = User.objects.create_user(username=data["username"], password=data["password"], is_staff=False)
    if user == None:
        return JsonResponse("Could not create user", safe=False, status=400)
    userStaff = Staff.objects.create(username=user.username, user=user, restaurant=request.user.staff.restaurant, is_admin=data["is_admin"])
    if userStaff == None:
        user.delete()
        return JsonResponse("Could not create user", safe=False, status=400)
    return JsonResponse({"username": userStaff.username,
                         "is_admin": userStaff.is_admin}, status=200)

@csrf_exempt
@require_http_methods(['DELETE'])
@login_required
def delete_menu_item(request, id):
    if not request.user.staff.is_admin:
        return JsonResponse("Unauthorized", safe=False, status=403)
    MenuItem.objects.filter(id=id).delete()
    return JsonResponse({"msg": "ok"}, status=200)

@csrf_exempt
@login_required
@require_http_methods(['DELETE'])
def delete_user(request, username):
    if not request.user.staff.is_admin:
        return JsonResponse("Unauthorized", safe=False, status=403)
    userToDelete = Staff.objects.get(username=username, restaurant=request.user.staff.restaurant)
    if (userToDelete == None):
        return JsonResponse("Not found", safe=False, status=404)
    m = ModelBackend()
    authUserToDelete = m.get_user(user_id=userToDelete.user.id)
    if (authUserToDelete == None):
        return JsonResponse("Not found", safe=False, status=404)
    authUserToDelete.delete()
    userToDelete.delete()
    return JsonResponse({"msg": "ok"}, safe=False, status=200)