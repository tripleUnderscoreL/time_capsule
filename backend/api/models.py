from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator

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
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return self.name
    
    class Meta():
        verbose_name = 'Товар'
        verbose_name_plural = 'Товары'

class Cart(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.pk)
    
    class Meta:
        verbose_name = 'Корзина'
        verbose_name_plural = 'Корзины'


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, null=False)
    item = models.ForeignKey(Product, on_delete=models.CASCADE, null=False)
    quantity = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.item} в корзине {self.cart}'

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