"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from general.models import Letter
from elements.models import Element




"""--------------------------------------------------------------------------------------
    Relation model
--------------------------------------------------------------------------------------"""
class Relation(models.Model):
   name = models.CharField(max_length=150, verbose_name="Relation name", validators=[MinValueValidator(3)])
   total_elements = models.SmallIntegerField(default=0)
   total_competences = models.SmallIntegerField(default=0)
   total_capabilities = models.SmallIntegerField(default=0)
   total_processes = models.SmallIntegerField(default=0)
   eva_made = models.SmallIntegerField(default=0)
   eva_progress = models.SmallIntegerField(default=0)
   comments = models.CharField(max_length=255, verbose_name="Comments", default="None")
   created = models.DateTimeField(auto_now=True)
   updated = models.DateTimeField(auto_now_add=True)
   status = models.SmallIntegerField(default=0)




"""--------------------------------------------------------------------------------------
   Competence relation model
--------------------------------------------------------------------------------------"""
class RelationComp(models.Model):
   original_letter = models.CharField(max_length=2, verbose_name="Original letter")
   relation_letter = models.ForeignKey(Letter, on_delete=models.CASCADE, verbose_name='Relation letter')
   percentage = models.DecimalField(max_digits=5, decimal_places=2)
   order = models.SmallIntegerField(default=0)
   id_relation = models.ForeignKey(Relation, on_delete=models.CASCADE)   
   id_element = models.ForeignKey(Element, on_delete=models.CASCADE)
   



"""--------------------------------------------------------------------------------------
   Capability relation model
--------------------------------------------------------------------------------------"""
class RelationCap(models.Model):   
   number = models.SmallIntegerField(default=0)
   percentage = models.DecimalField(max_digits=5, decimal_places=2)
   order = models.SmallIntegerField(default=0)
   id_relation = models.ForeignKey(Relation, on_delete=models.CASCADE)
   id_element = models.ForeignKey(Element, on_delete=models.CASCADE)
   relation_letter = models.ForeignKey(Letter, on_delete=models.CASCADE)
   parent_element = models.ForeignKey(Element, on_delete=models.CASCADE, related_name="parent_element_cap")




"""--------------------------------------------------------------------------------------
   Process relation model
--------------------------------------------------------------------------------------"""
class RelationPro(models.Model):   
   number = models.SmallIntegerField(default=0)
   percentage = models.DecimalField(max_digits=5, decimal_places=2)
   order = models.SmallIntegerField(default=0)
   id_relation = models.ForeignKey(Relation, on_delete=models.CASCADE)
   id_element = models.ForeignKey(Element, on_delete=models.CASCADE)
   relation_letter = models.ForeignKey(Letter, on_delete=models.CASCADE)
   parent_element = models.ForeignKey(Element, on_delete=models.CASCADE, related_name="parent_element_pro")




























