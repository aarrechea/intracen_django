"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.urls import path
#from . import views
from .views import CompaniesListView, CompanyCreateView, CompanyUpdateView, CompanyDeleteView




"""--------------------------------------------------------------------------------------
    Patterns
--------------------------------------------------------------------------------------"""
companies_patterns = ([
    path('companies/', CompaniesListView.as_view(), name='companies'),
    path('companies/add/', CompanyCreateView.as_view(), name='add'),
    path('companies/update/<int:pk>', CompanyUpdateView.as_view(), name='update'),
    path('companies/delete/<int:pk>', CompanyDeleteView.as_view(), name='delete'),
], 'companies')


"""companies_patterns = ([
    path('companies/', views.companies_list, name='companies'),
    path('companies/add/<str:action>/', views.add_company, name='add'),
    path('companies/add/<str:action>/<int:id_company>/', views.add_company, name='add'),
], 'companies')"""