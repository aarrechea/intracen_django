"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.shortcuts import render, redirect
from django.http import JsonResponse
from django.urls import reverse_lazy
from .models import AdditionalInformation, Element
from general.models import Letter
from django.contrib import messages




"""--------------------------------------------------------------------------------------
    Element list
--------------------------------------------------------------------------------------"""
def element_list(request, element):
   # ----- To show the modal
   if request.method == 'POST':
      element_type = request.POST.get('element')
      id = request.POST.get('id')

      if element_type == 'processes':
         add_info = AdditionalInformation.objects.get(add_info=id)
         definitions = add_info.definitions
         symptoms = add_info.symptoms
         questions = add_info.questions
      else:
         definitions = "None"
         symptoms = "None"
         questions = "None"

      element = Element.objects.get(pk=id)
      letter = element.letter.name
      
      response = {
         'type':element.type,         
         'letter': letter,
         'name':element.name,         
         'comments':element.comments,
         'created':element.created,
         'updated':element.updated,      
         'definitions':definitions,
         'symptoms':symptoms,
         'questions':questions,
      }
            
      return JsonResponse(response)

   # ----- Get
   else:
      list = Element.objects.filter(type=element)

      return render(request, 'elements/element_list.html', {
         'element':element,
         'list':list,
      })



"""--------------------------------------------------------------------------------------
    Add element
--------------------------------------------------------------------------------------"""
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



"""--------------------------------------------------------------------------------------
    Edit element
--------------------------------------------------------------------------------------"""
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



"""--------------------------------------------------------------------------------------
    Delete element
--------------------------------------------------------------------------------------"""
def delete_element(request):   
   if request.method == 'POST':
      element = Element.objects.get(id=request.POST.get('id'))
      element_type = element.type
      element.delete()

      message = 'The element was succesfully deleted'
      messages.success(request, message)

      return redirect('elements:elements', element_type)












