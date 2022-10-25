from django.urls import path, re_path
from .views import example_route, log_in, test_login_req, whoami

# Add URLS for endpoints located in views.py here
urlpatterns = [
  path('example/', example_route),
  path('login', log_in),
  path('whoami', whoami)
]