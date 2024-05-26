from django.contrib import admin
from api.models import Category, Product, Cart, CartItem, Comment, CommentImage

admin.site.register(Category)
admin.site.register(CartItem)
admin.site.register(Cart)
admin.site.register(Product)
admin.site.register(Comment)
admin.site.register(CommentImage)