from django.db import models
from django.contrib.auth.models import User, AbstractUser
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings

def product_image_path(instance, filename):
    return f'product_{instance.id}/{filename}'

def comment_image_path(instance, filename):
    return f'comments/{instance.comment.id}/{filename}'

class CapsuleUser(AbstractUser):
    phone_number = models.CharField(max_length=15, blank=True, null=True, verbose_name="Номер телефона")

class Category(models.Model):
    name = models.CharField(max_length=30, null=False, blank=False)
    short_description = models.CharField(max_length=100, null=False)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = 'Категория'
        verbose_name_plural = 'Категории'


class Product(models.Model):
    name = models.CharField(max_length=50, null=False, blank=False)
    description = models.TextField(null=False)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.PROTECT, default='по умолчанию', related_name='products')
    image = models.ImageField(upload_to=product_image_path, height_field=None, width_field=None, max_length=100, null=True)

    def save(self, *args, **kwargs):
        if self._state.adding and self.image:
            temp_image = self.image
            self.image = None
            super().save(*args, **kwargs)
            self.image = temp_image

        super().save(*args, **kwargs)

    def __str__(self):
        return self.name
    
    class Meta():
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'


class Cart(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, blank=True, on_delete=models.CASCADE)
    session_key = models.CharField(max_length=40, null=True, blank=True, unique=True)
    created_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"Cart {self.id}"

    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, related_name='items', on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def __str__(self):
        return f'{self.product} в корзине {self.cart}'

    class Meta:
        verbose_name = 'Товар в корзине'
        verbose_name_plural = 'Товары в корзине'


class Comment(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)
    content = models.TextField(blank=False, null=False)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'отзыв {self.id} от {self.user.username}'
    
    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        

class CommentImage(models.Model):
    comment = models.ForeignKey(Comment, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to=comment_image_path, height_field=None, width_field=None, default="", null=True, blank=True)

    class Meta:
        verbose_name = "Картинка к отзыву"
        verbose_name_plural = "Картинки к отзывам"