"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.db import models
from django.contrib.auth.models import User
from countries.models import Country
from industries.models import Subsector




"""--------------------------------------------------------------------------------------
    Company model
--------------------------------------------------------------------------------------"""
class Company(models.Model):
   name = models.CharField(max_length=150)
   address = models.CharField(max_length=250)
   postal_code = models.CharField(max_length=20)
   country = models.ForeignKey(Country, on_delete=models.CASCADE)
   city = models.CharField(max_length=50)
   year_establishment = models.IntegerField(default=1900)
   year_first_expo = models.IntegerField(default=1900)
   bussines_description = models.TextField(max_length=1000)
   subsector = models.ForeignKey(Subsector, on_delete=models.CASCADE)   
   comments = models.CharField(max_length=250)
   eva_made = models.IntegerField(default=0)
   eva_progress = models.IntegerField(default=0)
   created = models.DateTimeField(auto_now=True)
   updated = models.DateTimeField(auto_now_add=True)









