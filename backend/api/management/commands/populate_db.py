from django.core.management.base import BaseCommand
from api.models import Product, Category

print("Filling the database...")

class Command(BaseCommand):
    def _create_objects(self):
        category_1 = Category.objects.create(name="Капсулы времени", short_description="обычное_описание")
        category_2 = Category.objects.create(name="Наполнение для капсулы", short_description="обычное_описание")
        category_3 = Category.objects.create(name="Готовые наборы", short_description="обычное_описание")
    
        product_1 = Product.objects.create(name="Капсула-01", description="обычное_описание_для_капсулы", price=1000.00, category=category_1, image=None)
        product_2 = Product.objects.create(name="Наполнение-01", description="обычное_описание_для_наполнения", price=1000.00, category=category_2, image=None)
        product_3 = Product.objects.create(name="Набор-01", description="обычное_описание_для_набора", price=1000.00, category=category_3, image=None)

        print(f"Created product with ID: {product_1.id}")
        print(f"Created product with ID: {product_2.id}")
        print(f"Created product with ID: {product_3.id}")

    def handle(self, *args, **options):
         self._create_objects()