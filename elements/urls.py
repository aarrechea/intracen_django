"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.urls import path
from . import views
from .views import ElementListView, ElementCreateView




"""--------------------------------------------------------------------------------------
    Patterns
--------------------------------------------------------------------------------------"""
elements_patterns = ([
    path('elements/<str:element>/<str:singular>/', ElementListView.as_view() , name='elements'),
    path('element/add/<str:element>/<str:singular>/', ElementCreateView.as_view() , name='add'),
], 'elements')




"""
elements_patterns = ([
    path('elements/<str:element>/', views.element_list , name='elements'),    
    path('elements/add/<str:element>', views.add_element, name=''),
    path('elements/edit/<str:element>/<int:id>', views.edit_element, name='edit'),
    path('elements/delete', views.delete_element, name='delete'),
], 'elements')
"""







