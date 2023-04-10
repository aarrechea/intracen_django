# --- Imports
from django.urls import path
from . import views
from .views import ElementListView, ElementCreateView, ElementUpdateView, ElementDeleteView, GetAdditionalInformation



# --- Patterns
elements_patterns = ([
    path('elements/list/<str:element>/<str:singular>/', ElementListView.as_view() , name='elements'),    
    path('elements/add/<str:element>/<str:singular>/', ElementCreateView.as_view() , name='add'),
    path('elements/update/<str:element>/<str:singular>/<int:pk>', ElementUpdateView.as_view() , name='update'),
    path('elements/delete/<str:element>/<str:singular>/<int:pk>', ElementDeleteView.as_view() , name='delete'),
    path('elements/detail/<int:id>', GetAdditionalInformation.as_view() , name='detail'),
], 'elements')










