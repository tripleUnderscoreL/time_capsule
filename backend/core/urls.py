from django.contrib import admin
from django.urls import include, path, re_path
from api.views import ProductAPIView, ProductReviewListAPIView, ReviewCreateAPIView, CategoryProductsView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/products', ProductAPIView.as_view()),
    path('api/v1/auth/', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('api/v1/products/<int:product_id>/reviews/', ProductReviewListAPIView.as_view(), name='product_review_list'),
    path('api/v1/products/<int:product_id>/reviews/create/', ReviewCreateAPIView.as_view(), name='create_review'),
    path('api/v1/cart/', include('api.urls')),
    path('api/v1/category/<int:category_id>/products', CategoryProductsView.as_view(), name='category-products')
]
