from django.db import models

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
    