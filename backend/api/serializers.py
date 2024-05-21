from .models import Product, Cart, CartItem, Review, Profile
from rest_framework import serializers
from django.contrib.auth.models import User

class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ["username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'description']


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']


class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'user', 'session_key', 'items']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["user", "content", "rating", "date_added"]


class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.ReadOnlyField(source='user.username')
    email = serializers.ReadOnlyField(source='user.email')
    full_address = serializers.SerializerMethodField()

    class Meta:
        model = Profile
        fields = ['username', 'email', 'info', 'full_address']

    def get_full_address(self, obj):
        address_parts = [
            obj.street,
            f"{obj.house}" if obj.house else "",
            f"Floor {obj.floor}" if obj.floor else "",
            f"Apartment {obj.apartment}" if obj.apartment else "",
            obj.city,
            obj.region,
            obj.country
        ]
        full_address = ", ".join(filter(None, address_parts))
        return full_address