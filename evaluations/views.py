"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.models import User
from django.http import JsonResponse
from django.core import serializers
from django.db.models import Count
from django.contrib.admin.views.decorators import staff_member_required
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.db.models import F
from itertools import chain
from operator import itemgetter
from .models import Evaluation, DataModel, ProcessScore, MainProducts, CapabilityScore, CompetenceScore
from companies.models import Company
from relations_tree.models import Relation, RelationComp, RelationCap, RelationPro
from elements.models import Element, AdditionalInformation
from decimal import Decimal
import json




"""--------------------------------------------------------------------------------------
   Evaluation list
--------------------------------------------------------------------------------------"""
@login_required
def evaluation_list(request):
   evaluation_list = Evaluation.objects.all()
   companies = Company.objects.all()
   relations = Relation.objects.all()

   return render(request, 'evaluation_list.html', {
      'title':'evaluations',
      'element':'Evaluations',
      'evaluation_list':evaluation_list,
      'companies':companies,
      'relations':relations,
   })




"""--------------------------------------------------------------------------------------
   Create evaluation
--------------------------------------------------------------------------------------"""
@login_required
def create_evaluation(request):
   if request.method == 'POST':
      id_company = request.POST.get('id_company')
      id_relation = request.POST.get('id_relation')

      company = Company.objects.get(id=id_company)
      relation = Relation.objects.get(id=id_relation)      
      user = request.user

      evaluation = Evaluation(creator_user=user, relation=relation, company=company)
      evaluation.save()

      company.eva_progress = company.eva_progress + 1
      company.save()

      relation.eva_progress = relation.eva_progress + 1
      relation.save()
      
      last_eva = Evaluation.objects.filter().order_by('id').last() # Last evaluation created                  

      data_model = DataModel(id_evaluation=last_eva)
      data_model.save()
      
      create_process_score(last_eva)
      create_capability_score(last_eva)
      create_competence_score(last_eva)      
      
      elements_comp = relation.relationcomp_set.all()
      elements_cap = relation.relationcap_set.all()
      elements_pro = relation.relationpro_set.all()
            
      for ele in elements_comp:         
         ele.id_element.eva_progress = ele.id_element.eva_progress + 1
         ele.id_element.save()         

      for ele in elements_cap:
         ele.id_element.eva_progress = ele.id_element.eva_progress + 1
         ele.id_element.save()

      for ele in elements_pro:
         ele.id_element.eva_progress = ele.id_element.eva_progress + 1
         ele.id_element.save()

      return redirect('evaluations:evaluations')


# ----- Create process Score
def create_process_score(eva):
   x = 0
   
   relation_pro = eva.relation.relationpro_set.all().order_by('order')
   
   for rel in relation_pro:
      process_score = ProcessScore(form_number=x+1, id_evaluation=eva, element=rel.id_element, 
                                    order=rel.order, relation_pro=rel)
      process_score.save()
      x += 1


# ----- Create capability Score
def create_capability_score(eva):
   x = 0
   
   relation_cap = eva.relation.relationcap_set.all().order_by('order')
   
   for rel in relation_cap:
      cap_score = CapabilityScore(form_number=x+1, evaluation=eva, element=rel.id_element, 
                                    order=rel.order, relation_cap=rel)
      cap_score.save()
      x += 1      


# ----- Create competence Score
def create_competence_score(eva):
   x = 0
   
   relation_comp = eva.relation.relationcomp_set.all().order_by('order')
   
   for rel in relation_comp:
      comp_score = CompetenceScore(form_number=x+1, evaluation=eva, element=rel.id_element, order=rel.order)
      comp_score.save()
      x += 1            
      
      


"""--------------------------------------------------------------------------------------
   Delete evaluation
--------------------------------------------------------------------------------------"""
@login_required
def delete_eva(request):
   if request.method == 'POST':
      id_eva = request.POST.get('id_eva')

      eva = Evaluation.objects.get(id=id_eva)      

      company = Company.objects.get(id=eva.company.id)
      company.eva_progress = company.eva_progress - 1
      company.save()

      relation = Relation.objects.get(id=eva.relation.id)
      relation.eva_progress = relation.eva_progress - 1
      relation.save()

      elements_comp = relation.relationcomp_set.all()
      elements_cap = relation.relationcap_set.all()
      elements_pro = relation.relationpro_set.all()      
            
      for ele in elements_comp:
         ele.id_element.eva_progress = ele.id_element.eva_progress - 1
         ele.id_element.save()
         
      for ele in elements_cap:
         ele.id_element.eva_progress = ele.id_element.eva_progress - 1
         ele.id_element.save()

      for ele in elements_pro:
         ele.id_element.eva_progress = ele.id_element.eva_progress - 1
         ele.id_element.save()
      
      eva.delete()
      
      message = 'The evaluation was succesfully deleted'
      action = 'delete'
      
      messages.add_message(request, messages.INFO, action)
      messages.add_message(request, messages.INFO, message)
      
      return redirect('evaluations:evaluations')




"""--------------------------------------------------------------------------------------
   Continue evaluation from eva page to data evaluation page
--------------------------------------------------------------------------------------"""
@login_required
def continue_eva(request, id_eva):   
   data = DataModel.objects.get(id_evaluation=id_eva)
   company = Evaluation.objects.get(id=id_eva).company.name
   relation = Evaluation.objects.get(id=id_eva).relation.name   

   try:
      products = MainProducts.objects.filter(id_evaluation=id_eva)
   except:
      products = ""   
      
   return render(request, 'in_progress_data.html', {
      'id_eva':id_eva,
      'data':data,
      'products':products,
      'company':company,
      'relation':relation,
   })




"""--------------------------------------------------------------------------------------
   Save evaluation additional data
--------------------------------------------------------------------------------------"""
@login_required
def save(request):   
   if request.method == 'POST':
      id_eva = request.POST.get('id_eva')
      data = request.POST.get('data').split(",")
      products = request.POST.get('products').split(",")      
      evaluation = Evaluation.objects.get(id=id_eva)

      put_data(data, id_eva)
      put_products(products, evaluation)
      
      list_data_model = data_model_serialized(DataModel.objects.get(id_evaluation=id_eva))
      list_main_products = main_products_serialized(MainProducts.objects.all())
      
      response = {         
         'data_model':list_data_model,
         'main_products':list_main_products,
      }

      return JsonResponse(response)


# --- Put vector data into the data model and save
def put_data(vector, id_eva):
   data_model = DataModel.objects.get(id_evaluation=id_eva)

   data_model.years_exporting = vector[0]
   data_model.plans_to_export = vector[1]
   data_model.export_variation = vector[2]
   data_model.foreign_investment = vector[3]
   data_model.average_years = vector[4]
   data_model.top_or_middle = vector[5]
   data_model.women_employed = vector[6]
   data_model.women_top_or_middle = vector[7]
   data_model.ceo_title = vector[8]
   data_model.given_name = vector[9]
   data_model.family_name = vector[10]
   data_model.gender = vector[11]
   data_model.telephone = vector[12]
   data_model.email = vector[13]
   data_model.bussines_position = vector[14]
   data_model.years_in_the_post = vector[15]
   data_model.comments = vector[16]

   data_model.save()


# --- Put products and save
def put_products(products, evaluation):
   try:
      products_table = MainProducts.objects.filter(id_evaluation=evaluation)
      products_table.delete()
   finally:
      if len(products) > 1:
         for x in range(0, len(products), 2):
            main_products = MainProducts(product=products[x], percentage=products[x+1], id_evaluation=evaluation)
            main_products.save()
      

# --- Data model serialized
def data_model_serialized(data_model): 
   list = []

   list.append(data_model.years_exporting)
   list.append(data_model.plans_to_export)
   list.append(data_model.export_variation)

   if data_model.foreign_investment == 'true':
      list.append('True')
   else:
      list.append('False')

   list.append(data_model.average_years)
   list.append(data_model.top_or_middle)
   list.append(data_model.women_employed)
   list.append(data_model.women_top_or_middle)
   list.append(data_model.ceo_title)
   list.append(data_model.given_name)
   list.append(data_model.family_name)
   list.append(data_model.gender)
   list.append(data_model.telephone)
   list.append(data_model.email)
   list.append(data_model.bussines_position)
   list.append(data_model.years_in_the_post)
   list.append(data_model.comments)

   return list
   

# --- Main products serialized
def main_products_serialized(main_products):
   list_query_set = list(main_products)
   list_products = []

   for x in range(0, len(list_query_set)):
      list_products.append(list_query_set[x].product)
      list_products.append(list_query_set[x].percentage)

   return list_products




"""--------------------------------------------------------------------------------------
   General evaluation process in progress
--------------------------------------------------------------------------------------"""
@login_required
def process(request, id_eva, form):   
   company = Evaluation.objects.get(id=id_eva).company.name
   relation = Evaluation.objects.get(id=id_eva).relation
   relation_comp = RelationComp.objects.filter(id_relation=relation.id).order_by('order')   
   relation_cap = RelationCap.objects.filter(id_relation=relation.id).order_by('order')   
   relation_pro = RelationPro.objects.filter(id_relation=relation.id).order_by('order')   

   competences = RelationComp.objects.filter(id_relation=relation).order_by('order')
   capabilities = RelationCap.objects.filter(id_relation=relation).order_by('order')
   processes = RelationPro.objects.filter(id_relation=relation).order_by('order')
   scores = ProcessScore.objects.filter(id_evaluation=id_eva).order_by('form_number')   

   #for rel in relation_comp:      
      #print(f"Percentage {rel.id_element.additionalinformation.definitions}")
   
   return render(request, 'in_progress_process.html', {
      'id_eva':id_eva,
      'form':form,
      'company':company,
      'relation':relation,
      'competences':competences,
      'capabilities':capabilities,
      'processes':processes,
      'scores':scores,
      'relation_comp':relation_comp,
      'relation_cap':relation_cap,
      'relation_pro':relation_pro,
   })




"""--------------------------------------------------------------------------------------
   Save score
--------------------------------------------------------------------------------------"""
@login_required
def save_score(request):   
   if request.method == 'POST':
      vector = request.POST.get('vector').split(",")      
      
      process_score = ProcessScore.objects.filter(id_evaluation=vector[3]).get(element=vector[2])
      previous_score = process_score.score # To compare with the new score value
      process_score.score = vector[1]      
      process_score.score_transform = (Decimal(vector[1]) - 1) * Decimal(0.25)
      process_score.save()

      
      if previous_score == 0 and int(vector[1]) > 0 or previous_score > 0 and int(vector[1]) == 0:
         evaluation = Evaluation.objects.get(id=vector[3])         

         if previous_score == 0 and int(vector[1]) > 0:
            evaluation.processes_evaluated = evaluation.processes_evaluated + 1
         elif previous_score > 0 and int(vector[1]) == 0:
            evaluation.processes_evaluated = evaluation.processes_evaluated - 1
         evaluation.save()
               
      response = {         
         'message':'Success',
      }

      return JsonResponse(response)   




"""--------------------------------------------------------------------------------------
   Finalize evaluation
--------------------------------------------------------------------------------------"""
@login_required
def finalize_evaluation(request):
   if request.method == 'POST':
      id_eva = request.POST.get('id_eva')
      evaluation = Evaluation.objects.get(id=id_eva)

      calculate_score_pro(evaluation)      
      score_cap_comp(evaluation) # Cap percentage related comps quantity
      calculate_score_cap(evaluation)
      calculate_score_comp(evaluation)
      rating = calculate_rating(evaluation)
      
      evaluation.company.eva_progress = evaluation.company.eva_progress - 1
      evaluation.company.eva_made = evaluation.company.eva_made + 1
      evaluation.company.save()
      
      evaluation.relation.eva_progress = evaluation.relation.eva_progress - 1
      evaluation.relation.eva_made = evaluation.relation.eva_made + 1
      evaluation.relation.save()

      elements_comp = evaluation.relation.relationcomp_set.all()
      elements_cap = evaluation.relation.relationcap_set.all()
      elements_pro = evaluation.relation.relationpro_set.all()
            
      for ele in elements_comp:         
         ele.id_element.eva_progress = ele.id_element.eva_progress - 1
         ele.id_element.eva_made = ele.id_element.eva_made + 1
         ele.id_element.save()         

      for ele in elements_cap:
         ele.id_element.eva_progress = ele.id_element.eva_progress - 1
         ele.id_element.eva_made = ele.id_element.eva_made + 1
         ele.id_element.save()

      for ele in elements_pro:
         ele.id_element.eva_progress = ele.id_element.eva_progress - 1
         ele.id_element.eva_made = ele.id_element.eva_made + 1
         ele.id_element.save()
      
      response = {
         'rating':rating
      }

   return JsonResponse(response)   


# --- Calculate score pro
def calculate_score_pro(evaluation):
   process_score = evaluation.processscore_set.all().order_by('order')
   parent_cap_grouped = evaluation.relation.relationpro_set.all().values('parent_element').annotate(Count('parent_element')).order_by()

   x = 0
   for process in process_score:
      if process.relation_pro.parent_element.id != parent_cap_grouped[x]['parent_element']:
         x += 1
      
      process.score_percentage = 1 / parent_cap_grouped[x]['parent_element__count']
      process.save()
         
            
# --- Score cap comp
def score_cap_comp(evaluation):
   parent_comp_grouped = evaluation.relation.relationcap_set.all().values('parent_element').annotate(Count('parent_element')).order_by()
   cap_score = evaluation.capabilityscore_set.all().order_by('order')

   x = 0
   for cap in cap_score:      
      if cap.relation_cap.parent_element.id != parent_comp_grouped[x]['parent_element']:
         x += 1
      
      cap.score = 1 / parent_comp_grouped[x]['parent_element__count']
      cap.save()
   

# --- Calculate score cap
def calculate_score_cap(evaluation):
   pro_score = evaluation.processscore_set.all().order_by('order')
   cap_score = evaluation.capabilityscore_set.all().order_by('order')
      
   for cap in cap_score:
      score = 0      

      for pro in pro_score:
         if cap.element.id == pro.relation_pro.parent_element.id:
            score = score + pro.score_percentage * pro.score_transform
                  
      cap.score_percentage = score
      cap.save()      


# --- Calculate score comp
def calculate_score_comp(evaluation):
   cap_score = evaluation.capabilityscore_set.all().order_by('order')
   comp_score = evaluation.competencescore_set.all().order_by('order')
      
   for comp in comp_score:
      score = 0      

      for cap in cap_score:         
         if comp.element.id == cap.relation_cap.parent_element.id:
            score = score + cap.score_percentage * cap.score
                  
      comp.score_percentage = score
      comp.save()      
   

# --- Calculate rating and change finalized integer value
def calculate_rating(evaluation):
   comp_score = evaluation.competencescore_set.all().order_by('order')
   eva = Evaluation.objects.get(id=evaluation.id)

   rating = 1
   for comp in comp_score:
      rating = rating * comp.score_percentage

   eva.score = rating
   eva.finalized = 1
   eva.save()

   return rating
   



"""--------------------------------------------------------------------------------------
   View evaluation
--------------------------------------------------------------------------------------"""   
@login_required
def view_evaluation(request, id_eva):
   eva_comp = CompetenceScore.objects.filter(evaluation=id_eva).values('order', 'score_percentage', 'element_id')
   eva_cap = CapabilityScore.objects.filter(evaluation=id_eva).values('order', 'score_percentage', 'element_id')
   eva_pro = ProcessScore.objects.filter(id_evaluation=id_eva).values('order', 'score_percentage', 'element_id', 'score_transform')

   model_combination = sorted(list(chain(eva_comp, eva_cap, eva_pro)), key=itemgetter('order'))

   for model in model_combination:      
      if len(model) == 3:
         model['score_transform'] = 0

      element = Element.objects.get(pk=model['element_id'])
      model['element'] = element.type
      model['name'] = element.name

      model['score_percentage'] = str(model['score_percentage'])
      model['score_transform'] = str(model['score_transform'])

      if model['element'] == 'competences':
         rel = RelationComp.objects.get(id_element=element)
         model['relation_letter'] = rel.relation_letter.name
      elif model['element'] == 'capabilities':
         rel = RelationCap.objects.get(id_element=element)
         model['relation_letter'] = rel.number
      else:
         rel = RelationPro.objects.get(id_element=element)
         model['relation_letter'] = rel.number

   data = json.dumps(model_combination)

   return JsonResponse(data, safe=False)














