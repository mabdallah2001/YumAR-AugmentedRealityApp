from django.urls import path, re_path

from views import example_route, getOrder

# Add URLS for endpoints located in views.py here
# urlpatterns = [
#   path('example/', example_route)
# ]

urlpatterns = [
  path('order/', getOrder)
]