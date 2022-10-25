from django.urls import path, re_path

from . import views

# Add URLS for endpoints located in views.py here
urlpatterns = [
    re_path(r'^menu/', views.get_menu_items),
]