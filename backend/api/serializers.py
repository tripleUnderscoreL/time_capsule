from .models import Product, Cart, CartItem, Comment, CapsuleUser, CommentImage
from rest_framework import serializers
from django.contrib.auth.models import User
from django.utils.dateformat import DateFormat
from django.contrib.auth.hashers import make_password
from django.contrib.auth import get_user_model

User = get_user_model()
# class CapsuleUserSerializer(serializers.Serializer):
#     # password = serializers.CharField(write_only=True, required=True)
#     class Meta:
#         model = CapsuleUser
#         fields = ['id', 'username', 'password', 'email', 'phone_number']

#     def create(self, validated_data):
#         validated_data['password'] = make_password(validated_data.get('password'))
#         return super(CapsuleUserSerializer, self).create(validated_data)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CapsuleUser
        fields = ["username", "password", "email", "phone_number"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = CapsuleUser.objects.create_user(**validated_data)
        return user


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description', 'image']


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
