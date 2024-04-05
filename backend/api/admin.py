from django.contrib import admin
from api.models import Category, Product, Cart, CartItem

admin.site.register(Category)
admin.site.register(CartItem)
admin.site.register(Cart)
admin.site.register(Product)