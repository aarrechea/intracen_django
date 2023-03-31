"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.shortcuts import render, redirect
from django.contrib.auth.models import User
from user_profile.models import UserType, Profile




"""--------------------------------------------------------------------------------------
   Check users privileges:
      If user is not admin or super admin, can not enter the pages where the
      decorator is implemented
--------------------------------------------------------------------------------------"""
def user_privileges(func):
   def wrapped(request):
      user_type = request.user.profile.type.type
      
      if user_type == 1:
         return redirect('logout')
      else:
         return func(request)

   return wrapped












