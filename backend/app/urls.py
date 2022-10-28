from django.urls import path, re_path

from app.views import getOrder



# Add URLS for endpoints located in views.py here
# urlpatterns = [
#   path('example/', example_route)
# ]

urlpatterns = [
  path('order/', getOrder)
]