from email.policy import default
from django.db import models
from django.db.models import SET_NULL
from django.core.validators import MinValueValidator
from django.contrib.auth.models import User

# Create your models here.

'''
Note: the attributes commented out below have been done so because order of creation matters
      (e.g. you cannot have 'menu' in Restaurant if the Menu class hasn't been created yet).
      However, there are still links between the models in question, it is just unidirectional,
      not bidirectional.
'''

class Restaurant(models.Model):
    name = models.CharField(max_length=100, blank=False)
    cuisine = models.CharField(max_length=100, blank=False)
    # staff_list = models.ManyToManyField(Staff)
    # menu = models.ForeignKey(Menu, on_delete=SET_NULL, default=None, null=True)

    def __str__(self):
        return f"{self.name}"

class Staff(models.Model):
    username = models.CharField(max_length=100, blank=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    restaurant = models.ForeignKey(Restaurant, on_delete=SET_NULL, default=None, null=True)
    is_admin = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.username}"

class Category(models.Model):
    # menu = models.ForeignKey(Menu, on_delete=SET_NULL, default=None, null=True)
    name = models.CharField(max_length=100, blank=False)
    # menu_items_list = models.ManyToManyField(MenuItem])

    def __str__(self):
        return f"{self.name}"

class MenuItem(models.Model):
    category = models.ForeignKey(Category, on_delete=SET_NULL, default=None, null=True)
    name = models.CharField(max_length=100, blank=False)
    price = models.FloatField(validators=[MinValueValidator(0.0)])
    link_3d_model = models.CharField(max_length=100, blank=False)
    
    def __str__(self):
        return f"{self.name}"

class Menu(models.Model):
    menu_items = models.ManyToManyField(MenuItem)
    category_list = models.ManyToManyField(Category)
    restaurant = models.ForeignKey(Restaurant, on_delete=SET_NULL, default=None, null=True)

    def __str__(self):
        return f"Menu for {self.restaurant.name}"

class Order(models.Model):
    order_number = models.IntegerField(validators=[MinValueValidator(0)])
    menu_items = models.ManyToManyField(MenuItem)
    quantity = models.IntegerField(default=1)
    time_created = models.TimeField()
    total = models.FloatField(validators=[MinValueValidator(0.0)])
    is_completed = models.BooleanField(default=False)
    restaurant = models.ForeignKey(Restaurant, on_delete=SET_NULL, default=None, null=True)
    
    def __str__(self):
        return f"Order {self.order_number}"

class Customer(models.Model):
    orders = models.ManyToManyField(Order)
    table_number = models.IntegerField(validators=[MinValueValidator(0)])
    # customer_id automatically set by Django (as _id field)

    def __str__(self):
        return f"Customer {self._id}"    