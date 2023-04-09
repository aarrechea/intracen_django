"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.urls import path
from . import views
from .views import ElementListView, ElementCreateView, ElementUpdateView




"""--------------------------------------------------------------------------------------
    Patterns
--------------------------------------------------------------------------------------"""
elements_patterns = ([
    path('elements/list/<str:element>/<str:singular>/', ElementListView.as_view() , name='elements'),    
    path('elements/add/<str:element>/<str:singular>/', ElementCreateView.as_view() , name='add'),
    path('elements/update/<str:element>/<str:singular>/<int:pk>', ElementUpdateView.as_view() , name='update'),
], 'elements')




"""
elements_patterns = ([
    path('elements/<str:element>/', views.element_list , name='elements'),    
    path('elements/add/<str:element>', views.add_element, name=''),
    path('elements/edit/<str:element>/<int:id>', views.edit_element, name='edit'),
    path('elements/delete', views.delete_element, name='delete'),
], 'elements')
"""







