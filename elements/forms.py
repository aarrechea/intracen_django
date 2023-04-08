"""--------------------------------------------------------------------------------------
   Imports
------------------------------------------------------------------------------------- """
from django import forms
from .models import Element, AdditionalInformation
from general.models import Letter



"""--------------------------------------------------------------------------------------
   Element form for competences and capabilities
------------------------------------------------------------------------------------- """
class ElementForm(forms.ModelForm):   
   def __init__(self, *args, **kwargs):      
      super().__init__(*args, **kwargs)      
      self.fields['definitions'].required = False
      self.fields['symptoms'].required = False
      self.fields['questions'].required = False
      self.fields['assess_one'].required = False
      self.fields['assess_two'].required = False
      self.fields['assess_three'].required = False
      self.fields['assess_four'].required = False
      self.fields['assess_five'].required = False

   class Meta:                  
      model = Element
      fields = ['letter', 'name', 'element_type', 'definitions', 'symptoms', 'questions',
      'assess_one', 'assess_two', 'assess_three', 'assess_four', 'assess_five', ]

      widgets = {
        'name': forms.Textarea(attrs={'rows':'2'}),
        'definitions': forms.Textarea(attrs={'rows':'2', 'class':'textarea', 'data-add':'other'}),
        'symptoms': forms.Textarea(attrs={'rows':'2', 'class':'textarea', 'data-add':'other'}),
        'questions': forms.Textarea(attrs={'rows':'2', 'class':'textarea', 'data-add':'other'}),
        'assess_one': forms.Textarea(attrs={'rows':'2', 'class':'textarea assess'}),
        'assess_two': forms.Textarea(attrs={'rows':'2', 'class':'textarea assess'}),
        'assess_three': forms.Textarea(attrs={'rows':'2', 'class':'textarea assess'}),
        'assess_four': forms.Textarea(attrs={'rows':'2', 'class':'textarea assess'}),
        'assess_five': forms.Textarea(attrs={'rows':'2', 'class':'textarea assess'}),
        'element_type': forms.HiddenInput(),
      }




# ----- Process form
class AdditionalInformationForm(forms.ModelForm):      
   def __init__(self, *args, **kwargs):      
      super().__init__(*args, **kwargs)            
      letter_set = [(letter.id, letter.name) for letter in Letter.objects.all()]
      self.fields['element_type'] = forms.CharField(max_length=20)
      self.fields['name'] = forms.CharField(max_length=250, widget=forms.Textarea(attrs={'rows':'2'}))
      self.fields['letter'] = forms.CharField(widget=forms.Select(choices=letter_set))

   class Meta:
      model = AdditionalInformation
      fields = ['definitions', 'symptoms', 'questions', 'assess_one', 'assess_two', 'assess_three',
      'assess_four', 'assess_five',]

      widgets = {
         'definitions': forms.Textarea(attrs={'rows':'4', 'resized':'none'}),
         'symptoms': forms.Textarea(attrs={'rows':'4', 'resized':'none'}),
         'questions': forms.Textarea(attrs={'rows':'4', 'resized':'none'}),
         'assess_one': forms.Textarea(attrs={'rows':'2', 'resized':'none'}),
         'assess_two': forms.Textarea(attrs={'rows':'2', 'resized':'none'}),
         'assess_three': forms.Textarea(attrs={'rows':'2', 'resized':'none'}),
         'assess_four': forms.Textarea(attrs={'rows':'2', 'resized':'none'}),
         'assess_five': forms.Textarea(attrs={'rows':'2', 'resized':'none'}),
      }


