"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.db import models
from django.contrib.auth.models import User
from general.models import Letter
from elements.models import Element
from relations_tree.models import Relation, RelationPro, RelationCap
from companies.models import Company




"""--------------------------------------------------------------------------------------
    Evaluation model
--------------------------------------------------------------------------------------"""
class Evaluation(models.Model):
   end_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='end_user', blank=True, null=True)
   creator_user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='creator_user')
   processes_evaluated = models.IntegerField(default=0)
   relation = models.ForeignKey(Relation, on_delete=models.CASCADE)   
   finalized = models.BooleanField(default=0)
   score = models.DecimalField(default=0, max_digits=5, decimal_places=2)
   created = models.DateTimeField(auto_now=True)
   updated = models.DateTimeField(auto_now_add=True)
   finished = models.DateTimeField(blank=True, null=True)
   company = models.ForeignKey(Company, on_delete=models.CASCADE)



"""--------------------------------------------------------------------------------------
    Evaluation data model
--------------------------------------------------------------------------------------"""
class DataModel(models.Model):
    years_exporting = models.IntegerField(default=0)
    plans_to_export = models.SmallIntegerField(default=0)
    export_variation = models.IntegerField(default=0)
    foreign_investment = models.BooleanField(default=0)
    average_years = models.IntegerField(default=0)
    top_or_middle = models.IntegerField(default=0)
    women_employed = models.IntegerField(default=0)
    women_top_or_middle = models.IntegerField(default=0)
    ceo_title = models.SmallIntegerField(default=1)
    given_name = models.CharField(max_length=100, default='Empty')
    family_name = models.CharField(max_length=100, default='Empty')
    gender = models.SmallIntegerField(default=1)
    telephone = models.CharField(max_length=20, default='Empty')
    email = models.CharField(max_length=100, default='Empty')
    bussines_position = models.CharField(max_length=100, default='Empty')
    years_in_the_post = models.IntegerField(default=0)
    comments = models.TextField(max_length=255, default='Empty')
    id_evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE)



"""--------------------------------------------------------------------------------------
    Evaluation main products
--------------------------------------------------------------------------------------"""
class MainProducts(models.Model):
    product = models.CharField(max_length=30)
    percentage = models.IntegerField(default=0)
    id_evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE)



"""--------------------------------------------------------------------------------------
    Evaluation process score
--------------------------------------------------------------------------------------"""
class ProcessScore(models.Model):
    score = models.IntegerField(default=0)
    form_number = models.IntegerField(default=0)
    order = models.SmallIntegerField(default=0)
    element = models.ForeignKey(Element, on_delete=models.CASCADE)
    id_evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE)
    score_transform = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    score_percentage = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    relation_pro = models.ForeignKey(RelationPro, on_delete=models.CASCADE)




"""--------------------------------------------------------------------------------------
    Evaluation capability score
--------------------------------------------------------------------------------------"""
class CapabilityScore(models.Model):
    evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE)
    element = models.ForeignKey(Element, on_delete=models.CASCADE)
    form_number = models.IntegerField(default=0)
    order = models.SmallIntegerField(default=0)
    score_percentage = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    score = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    score_final = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    relation_cap = models.ForeignKey(RelationCap, on_delete=models.CASCADE)




"""--------------------------------------------------------------------------------------
    Evaluation competence score
--------------------------------------------------------------------------------------"""
class CompetenceScore(models.Model):
    evaluation = models.ForeignKey(Evaluation, on_delete=models.CASCADE)    
    element = models.ForeignKey(Element, on_delete=models.CASCADE)
    form_number = models.IntegerField(default=0)
    order = models.SmallIntegerField(default=0)
    score_percentage = models.DecimalField(default=0, max_digits=5, decimal_places=2)
    score_final = models.DecimalField(default=0, max_digits=5, decimal_places=2)


















