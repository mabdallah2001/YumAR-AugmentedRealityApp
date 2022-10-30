from django.urls import path, re_path
from .views import *

# Add URLS for endpoints located in views.py here
urlpatterns = [
    path('example/', example_route),
    path('menu/', get_menu_items),
    path('orders', get_restaurant_orders),
    path('orders/<int:orderId>/items', get_order_items),
    path('orders/<int:orderId>/complete', complete_order),
    path('login', log_in),
    path('placeorder/', addOrder),
    path('logout', log_out),
    path('item/<int:id>/', get_menu_item),
    path('item/<int:id>/delete', delete_menu_item),
    path('user/<str:username>/delete', delete_user),
    path('people', get_restaurant_people),
    path('whoami', whoami),
    path('register', register),
    path('categories', get_menu_categories),
    path('categories/<int:catId>', get_category_items),
    path('categories/new', new_category),
    path('categories/<int:catId>/new', new_menu_item),
    path('categories/<int:catId>/delete', delete_menu_category),
]
