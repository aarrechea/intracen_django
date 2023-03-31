"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.contrib import admin
from django.urls import path, include
from general.urls import general_patterns
from elements.urls import elements_patterns
from relations_tree.urls import relations_patterns
from evaluations.urls import evaluations_patterns
from companies.urls import companies_patterns
from users.urls import users_patterns




"""--------------------------------------------------------------------------------------
    Patterns
--------------------------------------------------------------------------------------"""
urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("accounts.urls")),
    path("accounts/", include("django.contrib.auth.urls")),
    path('', include(general_patterns)),
    path('', include(elements_patterns)),
    path('', include(relations_patterns)),
    path('', include(evaluations_patterns)),
    path('', include(companies_patterns)),
    path('', include(users_patterns)),
]


















