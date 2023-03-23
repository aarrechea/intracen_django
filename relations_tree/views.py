"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Relation, RelationComp, RelationCap, RelationPro
from elements.models import Element
from general.models import Letter




"""--------------------------------------------------------------------------------------
   Relations list
--------------------------------------------------------------------------------------"""
def relations_list(request):   
   list_relations = Relation.objects.all()
   list_comp = RelationComp.objects.all()
   list_cap = RelationCap.objects.all()
   list_pro = RelationPro.objects.all()

   return render(request, 'relations_tree/relations_tree.html', {
      'list':list_relations,
      'list_comp':list_comp,
      'list_cap':list_cap,
      'list_pro':list_pro,
   })




"""--------------------------------------------------------------------------------------
   Add and edit relation
--------------------------------------------------------------------------------------"""
def change_relation(request, action, id=0):
   if request.method == 'POST':
      vector = request.POST.get('input_data_form').split(",")
      vector_comp = request.POST.get('vector_comp_form').split(",")
      vector_cap = request.POST.get('vector_cap_form').split(",")
      vector_pro = request.POST.get('vector_pro_form').split(",")

      if action == "add":                              
         relation = Relation(name=vector[0], comments=vector[1], total_elements=vector[2], 
            total_competences=vector[3], total_capabilities=vector[4], total_processes=vector[5], status=vector[6])
         relation.save()

         max_id = Relation.objects.filter().order_by('id').last()      
               
         save_competences(max_id, vector_comp)
         save_elements(max_id, vector_cap, RelationCap)
         save_elements(max_id, vector_pro, RelationPro)         

      else:         
         relation = Relation.objects.get(id=id)

         relation.name = vector[0]
         relation.comments = vector[1]
         relation.total_elements = vector[2]
         relation.total_competences = vector[3]
         relation.total_capabilities = vector[4]
         relation.total_processes = vector[5]
         relation.status = vector[6]
         relation.save()

         relation_comp = RelationComp.objects.filter(id_relation=relation)
         relation_cap = RelationCap.objects.filter(id_relation=relation)
         relation_pro = RelationPro.objects.filter(id_relation=relation)

         relation_comp.delete()
         relation_cap.delete()
         relation_pro.delete()
                  
         save_competences(relation, vector_comp)         
         save_elements(relation, vector_cap, RelationCap)
         save_elements(relation, vector_pro, RelationPro)
      
      return redirect ('relations:relations')


   # ----- GET
   if action == 'add':
      title = 'Add relation'
   else:
      title = 'Edit relation'

   list = Element.objects.all().order_by('letter')
   letters = Letter.objects.all().order_by('letter_order')
   list_relations = Relation.objects.all()
   list_comp = RelationComp.objects.all()
   list_cap = RelationCap.objects.all()
   list_pro = RelationPro.objects.all()

   return render(request, 'relations_tree/change_relation.html', {
      'title':title,
      'list':list,
      'action':action,
      'letters':letters,
      'id_relation':id,
      'list_relations':list_relations,
      'list_comp':list_comp,
      'list_cap':list_cap,
      'list_pro':list_pro,
   })


# ---Save competences
def save_competences(id, vector):
   x = 0
   while x < len(vector) - 1:      
      relation_letter = Letter.objects.get(id=vector[x+1])
      element = Element.objects.get(id=vector[x+4])

      rel_comp = RelationComp(original_letter=vector[x], relation_letter=relation_letter, 
         percentage=vector[x+2], order=vector[x+3], id_relation=id, id_element=element)
      rel_comp.save()      

      x += 5   


# --- Save capabilities and processes
def save_elements(id, vector, model):
   x = 0

   print(f"Vector: {vector}")

   while x < len(vector) - 1:
      element = Element.objects.get(id=vector[x+3])
      letter = Letter.objects.get(pk=vector[x+4])
      parent_element = Element.objects.get(id=vector[x+5])

      relation = model(number=vector[x], percentage=vector[x+1], order=vector[x+2], 
         id_relation=id, id_element=element, relation_letter=letter, parent_element=parent_element)
      relation.save()

      x += 6




"""--------------------------------------------------------------------------------------
   Delete relation
--------------------------------------------------------------------------------------"""
def delete_relation(request):
   if request.method == 'POST':
      id_relation = request.POST.get('id_relation')
      relation = Relation.objects.get(id=id_relation)

      relation.delete()

      message = 'The relation was succesfully deleted'
      messages.success(request, message)

      return redirect ('relations:relations')








