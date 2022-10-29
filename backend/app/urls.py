from django.urls import path, re_path
from .views import example_route, get_menu_items, log_in, whoami, get_menu_item

# Add URLS for endpoints located in views.py here
urlpatterns = [
    path('example/', example_route),
    path('menu/', get_menu_items),
    path('login', log_in),
    path('item/<int:id>/',get_menu_item),
    path('whoami', whoami)
]