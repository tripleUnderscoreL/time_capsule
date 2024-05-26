from .models import Product, Cart, CartItem, Comment, Profile, CommentImage
from rest_framework import serializers
from django.contrib.auth.models import User
from django.utils.dateformat import DateFormat

class UserSerializer(serializers.Serializer):
    class Meta:
        model = User
        fields = ["username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['name', 'price', 'description', 'image']


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


class CommentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommentImage
        fields = ['id', 'comment', 'image']

class CommentSerializer(serializers.ModelSerializer):
    images = CommentImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(max_length=100000, allow_empty_file=False, use_url=False),
        write_only=True,
        required=False
    )
    user_name = serializers.SerializerMethodField()
    date_added = serializers.SerializerMethodField()
    class Meta:
        model = Comment
        fields = ['id', 'user', 'user_name', 'content', 'date_added', 'images', 'uploaded_images']

    def get_user_name(self, obj):
        return obj.user.username if obj.user else "Удаленный пользователь"  
    
    def get_date_added(self, obj):
        return DateFormat(obj.date_added).format('Y-m-d H:i')

    def create(self, validated_data):
        uploaded_images_data = validated_data.pop('uploaded_images', []) 
        comment = Comment.objects.create(**validated_data)
        for img_data in uploaded_images_data:
            CommentImage.objects.create(comment=comment, image=img_data)
        return comment


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