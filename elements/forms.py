"""--------------------------------------------------------------------------------------
   Imports
------------------------------------------------------------------------------------- """
from django import forms
from .models import Element, AdditionalInformation



"""--------------------------------------------------------------------------------------
   Element form
------------------------------------------------------------------------------------- """
class ElementForm(forms.ModelForm):   
   class Meta:                  
      model = Element
      fields = ['letter', 'name']

      widgets = {        
        'name': forms.Textarea(attrs={'rows':'2'})
      }



