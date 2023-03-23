"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.db import models



"""--------------------------------------------------------------------------------------
   Industry model
--------------------------------------------------------------------------------------"""
class Industry(models.Model):
   name = models.CharField(max_length=150)



"""--------------------------------------------------------------------------------------
   Supersector model
--------------------------------------------------------------------------------------"""
class Supersector(models.Model):
   name = models.CharField(max_length=150)
   industry = models.ForeignKey(Industry, on_delete=models.CASCADE)



"""--------------------------------------------------------------------------------------
   Sector model
--------------------------------------------------------------------------------------"""
class Sector(models.Model):
   name = models.CharField(max_length=150)
   supersector = models.ForeignKey(Supersector, on_delete=models.CASCADE)



"""--------------------------------------------------------------------------------------
   Subsector model
--------------------------------------------------------------------------------------"""
class Subsector(models.Model):
   name = models.CharField(max_length=150)
   sector = models.ForeignKey(Sector, on_delete=models.CASCADE)   










