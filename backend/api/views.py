from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import *
from .models import *


class ProductAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CartAPIView(generics.ListAPIView):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer


class CartItemsAPIView(generics.ListAPIView):
    serializer_class = CartItemSerializer

    def get_queryset(self):
        cart_pk = self.kwargs['cart_pk']
        return CartItem.objects.filter(cart__pk=cart_pk)
