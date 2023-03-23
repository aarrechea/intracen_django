"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.shortcuts import render, redirect
from django.contrib import messages
from .models import Company
from countries.models import Country
from industries.models import Industry, Supersector, Sector, Subsector



"""--------------------------------------------------------------------------------------
   Companies list
--------------------------------------------------------------------------------------"""
def companies_list(request):
   companies_list = Company.objects.all()
   industries = Industry.objects.all()
   supersectors = Supersector.objects.all()
   sectors = Sector.objects.all()
   subsectors = Subsector.objects.all()

   return render(request, 'companies_list.html', {
      'title':'companies',
      'element':'Companies',
      'companies_list':companies_list,
      'industries':industries,
      'supersectors':supersectors,
      'sectors':sectors,
      'subsectors':subsectors,
   })



"""--------------------------------------------------------------------------------------
   Add company
--------------------------------------------------------------------------------------"""
def add_company(request, action, id_company=0):
   if request.method == 'POST':      
      string_vector = request.POST.get('input_create_company')
      vector = string_vector.split(",")
      country_instance = Country.objects.get(id=vector[1])
      subsector_instance = Subsector.objects.get(id=vector[5])

      if id_company == 0:                  
         company = Company(name=vector[0], country=country_instance, city=vector[2], address=vector[3],
                           postal_code=vector[4], subsector=subsector_instance, year_establishment=vector[6],
                           year_first_expo=vector[7], bussines_description=vector[8], comments=vector[9])

      else:
         company = Company.objects.get(pk=id_company)

         company.name = vector[0]
         company.country = country_instance
         company.city = vector[2]
         company.address = vector[3]
         company.postal_code = vector[4]
         company.subsector = subsector_instance
         company.year_establishment = vector[6]
         company.year_first_expo = vector[5]
         company.bussines_description = vector[8]
         company.comments = vector[9]         

      company.save()
      
      messages.add_message(request, messages.INFO, action)
      
      return redirect('companies:companies')


   # ----- GET 
   vector = []
   vector_str = ''
   
   if id_company > 0: # If edit
      company = Company.objects.get(pk=id_company)
      vector_str = put_company_values_to_edit(id_company, vector, company)
   
   countries = Country.objects.all()
   industries = Industry.objects.all()
   supersectors = Supersector.objects.all()
   sectors = Sector.objects.all()
   subsectors = Subsector.objects.all()
         
   return render(request, 'add_company.html', {
      'countries':countries,
      'industries':industries,
      'supersectors':supersectors,
      'sectors':sectors,
      'subsectors':subsectors,
      'action':action,
      'id_company':id_company,
      'vector':vector_str,
   })


# --- Put company values to edit
def put_company_values_to_edit(id_company, vector, company):
   vector.append(id_company) # 0
   vector.append(company.name)
   vector.append(company.country.id)
   vector.append(company.city) # 3
   vector.append(company.address)  
   vector.append(company.postal_code)
   vector.append(company.subsector.id) # 6
   vector.append(company.year_establishment)
   vector.append(company.year_first_expo)
   vector.append(company.bussines_description) # 9
   vector.append(company.comments) # 10    

   vector_str = ','.join(str(item) for item in vector)

   return vector_str










