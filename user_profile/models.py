""" -------------------------------------------------------------------------------------
   Imports
--------------------------------------------------------------------------------------"""
from django.db import models
from django.contrib.auth.models import User
from django.db.models.signals import post_save
from django.dispatch import receiver
    



""" -------------------------------------------------------------------------------------
   User type model
--------------------------------------------------------------------------------------"""
class UserType(models.Model):
   type = models.SmallIntegerField(default=1)
   name = models.CharField(default="None", max_length=20)




""" -------------------------------------------------------------------------------------
   Profile model
--------------------------------------------------------------------------------------"""
class Profile(models.Model):
   user = models.OneToOneField(User, on_delete=models.CASCADE)
   type = models.ForeignKey(UserType, on_delete=models.CASCADE, null=True)
   evaluation_closed = models.SmallIntegerField(default=0)
   evaluation_started = models.SmallIntegerField(default=0)

   @receiver(post_save, sender=User)
   def create_user_profile(sender, instance, created, **kwargs):
      if created:
         Profile.objects.create(user=instance)

   @receiver(post_save, sender=User)
   def save_user_profile(sender, instance, **kwargs):
      instance.profile.save()






