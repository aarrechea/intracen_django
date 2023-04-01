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
    path('elements/<str:element>', ElementListView.as_view() , name='elements'),
    path('elements/add', ElementCreateView.as_view() , name='add'),
], 'elements')




"""
elements_patterns = ([
    path('elements/<str:element>/', views.element_list , name='elements'),    
    path('elements/add/<str:element>', views.add_element, name='add'),    
    path('elements/edit/<str:element>/<int:id>', views.edit_element, name='edit'),
    path('elements/delete', views.delete_element, name='delete'),
], 'elements')
"""







