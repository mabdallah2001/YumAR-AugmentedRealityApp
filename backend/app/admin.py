from django.contrib import admin

# Register your models here.

from .models import *

admin.site.register(Restaurant)
admin.site.register(Staff)
admin.site.register(Category)
admin.site.register(MenuItem)
admin.site.register(Menu)
admin.site.register(Order)
admin.site.register(Customer)
