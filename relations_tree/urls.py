"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.urls import path
from . import views




"""--------------------------------------------------------------------------------------
    Patterns
--------------------------------------------------------------------------------------"""
relations_patterns = ([
    path('', views.relations_list, name='relations'),       
    path('relations/', views.relations_list, name='relations'),
    path('relations/<str:action>/', views.change_relation, name='change'),
    path('relations/<str:action>/<int:id>', views.change_relation, name='change'),
    path('relations/delete', views.delete_relation, name='delete'),
], 'relations')






