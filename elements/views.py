# --- Imports
from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.urls import reverse_lazy
from django.contrib.auth.decorators import login_required
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.messages.views import SuccessMessageMixin
from django.views.generic import ListView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.views import View
from django.utils.decorators import method_decorator
from django.http import JsonResponse
from django.forms.models import model_to_dict
from .models import AdditionalInformation, Element
from .forms import ElementForm, AdditionalInformationForm
from general.models import Letter
from django.contrib import messages
from decorators.views import user_privileges
import json




# --- Element list
@method_decorator(login_required, name='dispatch')
@method_decorator(user_privileges, name='dispatch')
class ElementListView(ListView):
	model = Element
	template_name = 'elements/list.html'   
	context_object_name = 'elements'

	def dispatch(self, request, *args, **kwargs):
		self.element = kwargs['element']
		self.singular = kwargs['singular']
		return super().dispatch(request, *args, **kwargs)
   
	def get_queryset(self, **kwargs):		
		return super().get_queryset().filter(element_type= self.element)

	def get_context_data(self, **kwargs):
		context = super().get_context_data(**kwargs)		
		context["element"] = self.element
		context["singular"] = self.singular
		return context
			   
   

# ---   Create element
@method_decorator(login_required, name='dispatch')
@method_decorator(user_privileges, name='dispatch')
class ElementCreateView(SuccessMessageMixin, CreateView):   
   template_name = 'elements/add.html'
   form_class = ElementForm
   success_message = 'The element was succesfully created'

   def dispatch(self, request, *args, **kwargs):
      self.element = kwargs['element']
      self.singular = kwargs['singular']      
      return super().dispatch(request, *args, **kwargs)

   def get_context_data(self, **kwargs):
      context = super().get_context_data(**kwargs)
      context["element"] = self.element
      context["singular"] = self.singular
      context['action'] = 'Add'
      return context
   
   def get_success_url(self):      
      return reverse_lazy("elements:add", kwargs={"element":self.element, "singular":self.singular})

   def get_initial(self):      
      return {'element_type':self.element}
   


# --- Update element
@method_decorator(login_required, name='dispatch')
@method_decorator(user_privileges, name='dispatch')
class ElementUpdateView(SuccessMessageMixin, UpdateView):
   model = Element
   template_name = 'elements/add.html'
   form_class = ElementForm
   success_message = 'The element was succesfully updated'   

   def dispatch(self, request, *args, **kwargs):
      self.element = kwargs['element']
      self.singular = kwargs['singular']
      return super().dispatch(request, *args, **kwargs)

   def get_context_data(self, **kwargs):
      context = super().get_context_data(**kwargs)
      context["element"] = self.element
      context["singular"] = self.singular
      context['action'] = 'Edit'
      return context

   def get_success_url(self):      
      return reverse_lazy("elements:elements", kwargs={"element":self.element, "singular":self.singular})      
      

      
# --- Delete element      	
@method_decorator(login_required, name='dispatch')
@method_decorator(user_privileges, name='dispatch')
class ElementDeleteView(SuccessMessageMixin, DeleteView):
   model = Element   
   template_name = 'elements/element_confirm_delete.html'
   success_message = 'The %(element)s was succesfully deleted'   

   def dispatch(self, request, *args, **kwargs):
      self.element = kwargs['element']
      self.singular = kwargs['singular']
      return super().dispatch(request, *args, **kwargs)

   def get_context_data(self, **kwargs):
      context = super().get_context_data(**kwargs)
      context["element"] = self.element
      context["singular"] = self.singular      
      return context

   def get_success_url(self):      
      return reverse_lazy("elements:elements", kwargs={"element":self.element, "singular":self.singular})

   def get_success_message(self, cleaned_data):
      return self.success_message % dict(
         cleaned_data,
         element = self.singular
      )



# --- Get one process to show additional information
@method_decorator(login_required, name='dispatch')
class GetAdditionalInformation(View):
   def get(self, request, *args, **kwargs):      
      process = Element.objects.get(id=kwargs['id'])      
      data_dict = model_to_dict(process)
      data = json.dumps(data_dict)
      return JsonResponse(data, safe=False)
      






"""--------------------------------------------------------------------------------------
    Add element
--------------------------------------------------------------------------------------
@login_required
@user_privileges
def add_element(request, element):
   if request.method == 'POST':
      element_post = request.POST.get('element')
      name = request.POST.get('element_name')
      comments = request.POST.get('element_comments')      
      letter_model = Letter.objects.get(id=request.POST['select'])

      if comments == '' or len(comments) == 0:
         comments = 'None'

      element = Element(type=element_post, letter=letter_model, name=name, comments=comments)
      element.save()
            
      if element_post == 'processes':
         max_id = Element.objects.filter().order_by('id').last()         
         definitions = request.POST.get('definitions')
         symptoms = request.POST.get('symptoms')
         questions = request.POST.get('questions')      
         
         if definitions == '' or len(definitions) == 0:
            definitions = 'None'

         if symptoms == '' or len(symptoms) == 0:
            symptoms = 'None'

         if questions == '' or len(questions) == 0:
            questions = 'None'

         additional_information = AdditionalInformation(definitions=definitions, symptoms=symptoms, 
                                                         questions=questions, add_info=max_id)
         additional_information.save()

      if element == 'processes':
         new_element = 'Process'
      elif element == 'capabilities':
         new_element = 'Capability'
      else:
         new_element = 'Competence'

      message = f'The {new_element} {letter_model} - {name} was succesfully added'
      messages.success(request, message)      
                        
      return redirect('elements:elements', element_post)


   # ----- Get      
   letters = Letter.objects.all()      

   if element == 'processes':
      title = 'Add process'
   elif element == 'capabilities':
      title = 'Add capability'
   else:
      title = 'Add competence'   

   return render(request, 'elements/add_element.html', {
      'title':title,
      'letters':letters,
      'element':element
   })
"""
"""--------------------------------------------------------------------------------------
    Edit element
--------------------------------------------------------------------------------------
@login_required
@user_privileges
def edit_element(request, element, id):
   if request.method == 'POST':
      element_selected = Element.objects.get(pk=request.POST.get('id'))

      if request.POST.get('element_comments') == '' or len(request.POST.get('element_comments')) == 0:
         comments = 'None'
      else:
         comments = request.POST.get('element_comments')

      element_selected.type = request.POST.get('element')
      element_selected.name = request.POST.get('element_name')
      element_selected.comments = comments
      element_selected.letter = Letter.objects.get(id=request.POST['select'])
      
      element_selected.save()
            
      if element == 'processes':
         add_info_object = AdditionalInformation.objects.get(add_info=id)

         if request.POST.get('definitions') == '' or len(request.POST.get('definitions')) == 0:
            definitions = 'None'
         else:
            definitions = request.POST.get('definitions')

         if request.POST.get('symptoms') == '' or len(request.POST.get('symptoms')) == 0:
            symptoms = 'None'
         else:
            symptoms = request.POST.get('symptoms')

         if request.POST.get('questions') == '' or len(request.POST.get('questions')) == 0:
            questions = 'None'
         else:
            questions = request.POST.get('questions')
         
         add_info_object.definitions = definitions
         add_info_object.symptoms = symptoms
         add_info_object.questions = questions
                  
         add_info_object.save()

      if element == 'processes':
         new_element = 'Process'
      elif element == 'capabilities':
         new_element = 'Capability'
      else:
         new_element = 'Competence'

      message = f'The {new_element} {element_selected.letter} - {element_selected.name} was succesfully edited'
      messages.success(request, message)      
                        
      return redirect('elements:elements', element)


   # ----- Get      
   letters = Letter.objects.all()         

   element_selected = Element.objects.get(pk=id)
   add_info = AdditionalInformation.objects.get(add_info=id)

   if element == 'processes':
      title = 'Edit process'
   elif element == 'capabilities':
      title = 'Edit capability'
   else:
      title = 'Edit competence'
   
   return render(request, 'elements/edit_element.html', {
      'title':title,
      'letters':letters,
      'element':element,
      'element_selected':element_selected,
      'add_info':add_info,
      'id':id,
   })
"""
"""--------------------------------------------------------------------------------------
    Delete element
--------------------------------------------------------------------------------------
@login_required
@user_privileges
def delete_element(request):   
   if request.method == 'POST':
      element = Element.objects.get(id=request.POST.get('id'))
      element_type = element.type
      element.delete()

      message = 'The element was succesfully deleted'
      messages.success(request, message)

      return redirect('elements:elements', element_type)
"""











