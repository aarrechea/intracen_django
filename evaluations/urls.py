"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.urls import path
from . import views



"""--------------------------------------------------------------------------------------
    Patterns
--------------------------------------------------------------------------------------"""
evaluations_patterns = ([
    path('evaluations/', views.evaluation_list, name='evaluations'),
    path('evaluations/create', views.create_evaluation, name='create'),
    path('evaluations/delete', views.delete_eva, name='delete'),
    path('evaluations/continue/<int:id_eva>', views.continue_eva, name='continue'),
    path('evaluations/process/<int:id_eva>/<int:form>', views.process, name='process'),
    path('evaluations/save', views.save, name='save'),
    path('evaluations/save_score', views.save_score, name='save_score'),
    path('evaluations/finalize', views.finalize_evaluation, name='finalize'),
    path('evaluations/view/<int:id_eva>', views.view_evaluation, name='view'),
], 'evaluations')











