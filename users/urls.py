""" -------------------------------------------------------------------------------------
   Imports
--------------------------------------------------------------------------------------"""
from django.urls import path
from .views import UsersListView




"""--------------------------------------------------------------------------------------
    Patterns
--------------------------------------------------------------------------------------"""
users_patterns = ([
   path('users/', UsersListView.as_view(), name='users')

], 'users')










