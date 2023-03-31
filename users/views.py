""" -------------------------------------------------------------------------------------
   Imports
--------------------------------------------------------------------------------------"""
from django.shortcuts import render
from django.views.generic import ListView
from django.contrib.auth.models import User




""" -------------------------------------------------------------------------------------
   List users
--------------------------------------------------------------------------------------"""
class UsersListView(ListView):
   model = User
   template_name = 'users/user_list.html'

   def get_queryset(self):
      qs = self.model.objects.order_by('last_name')
      return qs

   def get_context_data(self, **kwargs):
      context = super().get_context_data(**kwargs)
      context["title"] = 'users'
      context["element"] = 'Users'
      return context
   
   
   












