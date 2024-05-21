from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.conf import settings

def product_image_path(instance, filename):
    return f'product_{instance.id}/{filename}'

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="профиль")
    info = models.TextField(blank=True)
    country = models.TextField(max_length=100, blank=True)
    region = models.TextField(max_length=100, blank=True)
    city = models.TextField(max_length=100, blank=True)
    street = models.TextField(max_length=100, blank=True)
    house = models.IntegerField(blank=True)
    floor = models.IntegerField(blank=True)
    apartment = models.IntegerField(blank=True)


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
        if self._state.adding and not self.id:
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


class Review(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
    user = models.ForeignKey(User, on_delete=models.SET_DEFAULT, default="Удаленный пользователь")
    content = models.TextField(blank=False, null=False)
    rating = models.IntegerField(default=5, validators=[MinValueValidator(1), MaxValueValidator(5)])
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self) -> str:
        return f'{self.user.username} - рейтинг {self.rating} для {self.product.name}'
    
    class Meta:
        verbose_name = "Отзыв"
        verbose_name_plural = "Отзывы"
        