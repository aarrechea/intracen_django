"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.db import models
from general.models import Letter
from django.contrib.auth.models import User




"""--------------------------------------------------------------------------------------
    Element model
--------------------------------------------------------------------------------------"""
class Element(models.Model):
    element_type = models.CharField(max_length=15, verbose_name='Element Type')
    letter = models.ForeignKey(Letter, on_delete=models.CASCADE)
    name = models.CharField(max_length=250, verbose_name='Competence name', null=False, blank=False)
    comments = models.CharField(max_length=255, verbose_name='Comments', default='None')
    eva_progress = models.IntegerField(default=0)
    eva_made = models.IntegerField(default=0)
    created = models.DateTimeField(auto_now=True)
    updated = models.DateTimeField(auto_now_add=True)
    definitions = models.TextField(verbose_name="Definitions", default="None", max_length=2000)
    symptoms = models.TextField(verbose_name="Symptoms", default="None", max_length=3000)
    questions = models.TextField(verbose_name="Sample questions", default="None", max_length=3000)
    assess_one = models.TextField(default="None", max_length=1000)
    assess_two = models.TextField(default="None", max_length=1000)
    assess_three = models.TextField(default="None", max_length=1000)
    assess_four = models.TextField(default="None", max_length=1000)
    assess_five = models.TextField(default="None", max_length=1000)
   

    class Meta:
      ordering = ('letter', 'name', 'created')

    def __str__(self):
        return self.name
    




"""--------------------------------------------------------------------------------------
    Additional information model
--------------------------------------------------------------------------------------"""
class AdditionalInformation(models.Model):
    definitions = models.TextField(verbose_name="Definitions", default="None", max_length=2000)
    symptoms = models.TextField(verbose_name="Symptoms", default="None", max_length=3000)
    questions = models.TextField(verbose_name="Sample questions", default="None", max_length=3000)
    assess_one = models.TextField(default="None", max_length=1000)
    assess_two = models.TextField(default="None", max_length=1000)
    assess_three = models.TextField(default="None", max_length=1000)
    assess_four = models.TextField(default="None", max_length=1000)
    assess_five = models.TextField(default="None", max_length=1000)
    add_info = models.OneToOneField(Element, on_delete=models.CASCADE, null=True, blank=True)
   
    def __str__(self):
        return self.add_info.element.name
   









   
