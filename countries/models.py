"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.db import models



"""--------------------------------------------------------------------------------------
    Region model
--------------------------------------------------------------------------------------"""
class Region(models.Model):
   name = models.CharField(max_length=150)



"""--------------------------------------------------------------------------------------
    Region model
--------------------------------------------------------------------------------------"""
class Continent(models.Model):
   name = models.CharField(max_length=150)



"""--------------------------------------------------------------------------------------
    Country model
--------------------------------------------------------------------------------------"""
class Country(models.Model):
   name = name = models.CharField(max_length=150, verbose_name='Country')
   inhabitants = models.IntegerField(default=0)
   continent = models.ForeignKey(Continent, on_delete=models.CASCADE)
   region = models.ForeignKey(Region, on_delete=models.CASCADE)

   def __str__(self):
       return self.name
   



















