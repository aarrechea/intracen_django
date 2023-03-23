"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.urls import path
from . import views




"""--------------------------------------------------------------------------------------
    Patterns
--------------------------------------------------------------------------------------"""
companies_patterns = ([
    path('companies/', views.companies_list, name='companies'),
    path('companies/add/<str:action>/', views.add_company, name='add'),
    path('companies/add/<str:action>/<int:id_company>/', views.add_company, name='add'),
], 'companies')