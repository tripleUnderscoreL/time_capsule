# from django.contrib.auth.signals import user_logged_in
# from django.db.models.signals import post_save
# from django.contrib.auth.models import User
# from django.dispatch import receiver
# from .models import Profile, Cart

# @receiver(post_save, sender=User)
# def create_user_profile(sender, instance, created, **kwargs):
#     if created:
#         Profile.objects.create(user=instance)


# @receiver(post_save, sender=User)
# def save_user_profile(sender, instance, **kwargs):
#     instance.profile.save()


# @receiver(user_logged_in)
# def transfer_cart(sender, user, request, **kwargs):
#     session_key = request.session.session_key
#     if session_key:
#         try:
#             cart = Cart.objects.get(session_key=session_key, user__isnull=True)
#             existing_cart = Cart.objects.filter(user=user).first()
#             if existing_cart:
#                 existing_cart.delete()
#             cart.user = user
#             cart.session_key = None
#             cart.save()
#             print('Cart transferred to authenticated user')
#         except Cart.DoesNotExist:
#             print('No cart found for session key')
#     else:
#         print('No session key found in request')
