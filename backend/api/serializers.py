from .models import Product, Cart, CartItem, Comment, CapsuleUser, CommentImage
from rest_framework import serializers
from django.utils.dateformat import DateFormat
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

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

    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationError as e:
            raise serializers.ValidationError(e.messages)
        return value

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = CapsuleUser(**validated_data)
        user.set_password(password)
        user.save()
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
    cart_total = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'cart_total']

    def get_cart_total(self, obj):
        total = sum(item.product.price * item.quantity for item in obj.items.all())
        return total


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
