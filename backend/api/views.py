from rest_framework import generics, status, viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.authtoken.models import Token
from .serializers import *
from .models import *
from django.contrib.auth import get_user_model
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticatedOrReadOnly, AllowAny, IsAuthenticated
from rest_framework.decorators import action

User = get_user_model()

class ProductAPIView(generics.ListAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class CategoryProductsView(generics.ListAPIView):
    serializer_class = ProductSerializer

    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return Product.objects.filter(category_id=category_id)
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        if not queryset.exists():
            return Response({"detail": "Категория не найдена или в данной категории нет товаров"}, status=status.HTTP_404_NOT_FOUND)
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    
@api_view(['POST'])
def signup(request):
    serializer = UserSerializer
    if serializer.is_valid(self=serializer):
        serializer.save()
        user = User.objects.get(username=request.data['username'])
        user.set_password(request.data['password'])
        user.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if user.check_password(request.data['password']):
        return Response({"Detail": "bad username/password combo"}, status=status.HTTP_404_NOT_FOUND)
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(instance=user)
    return Response({"token": token.key, "user": serializer.data})

@api_view(['GET'])
def test(request):
    return Response({})


# class ProductReviewListAPIView(generics.ListAPIView):
#     serializer_class = ReviewSerializer

#     def get_queryset(self):
#         product_id = self.kwargs.get('product_id')
#         return Comment.objects.filter(product_id=product_id)

class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            self.permission_classes = [IsAuthenticated]
        else:
            self.permission_classes = []
        return super().get_permissions()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)



class CartViewSet(viewsets.ViewSet):
    def get_permissions(self):
        if self.action == 'add_item' or 'remove_item':
            return [AllowAny()]
        return [IsAuthenticatedOrReadOnly()]

    def get_cart(self, request):
        if request.user.is_authenticated:
            cart = Cart.objects.filter(session_key=request.session.session_key).first()
            if cart:
                cart.user = request.user
                cart.save()
            else:
                session_key = request.session.session_key
                cart, created = Cart.objects.get_or_create(user=request.user, session_key=session_key)
        else:
            session_key = request.session.session_key
            cart, created = Cart.objects.get_or_create(session_key=session_key)
        
        return cart
    
    def list(self, request):
        cart = self.get_cart(request)
        serializer = CartSerializer(cart)
        return Response(serializer.data)

    @action(detail=False, methods=['POST'])
    def add_item(self, request):
        cart = self.get_cart(request)
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))
        product = get_object_or_404(Product, id=product_id)
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    @action(detail=True, methods=['DELETE'])
    def remove_item(self, request, pk=None):
        cart = self.get_cart(request)
        cart_item = get_object_or_404(CartItem, cart=cart, pk=pk)
        cart_item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)