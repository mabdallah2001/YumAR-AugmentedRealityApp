from django.urls import path
from .views import example_route, get_menu_items

# Add URLS for endpoints located in views.py here
urlpatterns = [
    path('example/', example_route),
    path('menu/', get_menu_items)
]