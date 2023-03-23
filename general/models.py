"""--------------------------------------------------------------------------------------
   Imports
--------------------------------------------------------------------------------------"""
from django.db import models
from django.contrib.auth.models import User




"""--------------------------------------------------------------------------------------
   Letters
--------------------------------------------------------------------------------------"""
class Letter(models.Model):
    letter_order = models.IntegerField(default=0)
    name = models.CharField(max_length=2, verbose_name='Letter name')
    
    # Meta class --------------------------------------------------------------
    class Meta:
        verbose_name = "Letter"
        verbose_name_plural = "Letters"

    # To string method --------------------------------------------------------
    def __str__(self):
        return f"{self.name}"




"""--------------------------------------------------------------------------------------
   Log table
--------------------------------------------------------------------------------------"""
class LogTable(models.Model):    
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=100)
    date_time = models.DateTimeField(auto_now=True)
    function = models.CharField(max_length=150, verbose_name='Function')
    operation = models.CharField(max_length=250)
    comments = models.CharField(max_length=250)









