from django.urls import path, re_path
from .views import example_route, get_category_items, get_menu_categories, get_menu_items, log_in, new_category, new_menu_item, whoami, get_menu_item

# Add URLS for endpoints located in views.py here
urlpatterns = [
    path('example/', example_route),
    path('menu/', get_menu_items),
    path('login', log_in),
    path('item/<int:id>/',get_menu_item),
    path('whoami', whoami),
    path('categories', get_menu_categories),
    path('categories/<int:catId>', get_category_items),
    path('categories/new', new_category),
    path('categories/<int:catId>/new', new_menu_item),
]