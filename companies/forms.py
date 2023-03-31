"""--------------------------------------------------------------------------------------
   Imports
------------------------------------------------------------------------------------- """
from django import forms
from .models import Company



"""--------------------------------------------------------------------------------------
   Company form
------------------------------------------------------------------------------------- """
class CompanyForm(forms.ModelForm):   
   class Meta:                  
      model = Company
      fields = ['name', 'address', 'postal_code', 'country', 'city', 'year_establishment',
               'year_first_expo', 'bussines_description', 'subsector', 'comments']

      widgets = {
         'comments': forms.Textarea()
      }











