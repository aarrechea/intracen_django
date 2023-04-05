"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from django.views.generic import ListView
from django.views.generic.edit import CreateView, UpdateView, DeleteView
from django.shortcuts import render, redirect
from django.contrib.messages.views import SuccessMessageMixin
from django.contrib.auth.decorators import login_required
from django.utils.decorators import method_decorator
from django.urls import reverse, reverse_lazy
from django.contrib import messages
from .models import Company
from .forms import CompanyForm
from countries.models import Country
from industries.models import Industry, Supersector, Sector, Subsector




"""--------------------------------------------------------------------------------------
   Companies list
--------------------------------------------------------------------------------------"""
#@method_decorator(login_required, name='dispatch')
class CompaniesListView(ListView):
   model = Company
   template_name = 'company_list.html'

   def get_context_data(self, **kwargs):
      context = super().get_context_data(**kwargs)
      context['title'] = 'companies'
      context['element'] = 'Companies'
      context["industries"] = Industry.objects.all()
      context["supersectors"] = Supersector.objects.all()
      context["sectors"] = Sector.objects.all()
      context["subsectors"] = Subsector.objects.all()
      return context
   


"""--------------------------------------------------------------------------------------
   Add company
------------------------------------------------------------------------------------- """
@method_decorator(login_required, name='dispatch')
class CompanyCreateView(SuccessMessageMixin, CreateView):
   model = Company
   form_class = CompanyForm
   template_name = 'companies/add.html'
   success_url = reverse_lazy('companies:companies')
   success_message = 'The company was succesfully created'


   def get_context_data(self, **kwargs):
      context = super().get_context_data(**kwargs)
      context["industries"] = Industry.objects.all()
      context["supersectors"] = Supersector.objects.all()
      context["sectors"] = Sector.objects.all()
      context["subsectors"] = Subsector.objects.all()
      return context



"""--------------------------------------------------------------------------------------
   Update company
------------------------------------------------------------------------------------- """
@method_decorator(login_required, name='dispatch')
class CompanyUpdateView(SuccessMessageMixin, UpdateView):
   model = Company
   form_class = CompanyForm
   template_name = 'companies/update_company.html'
   success_url = reverse_lazy('companies:companies')   
   success_message = 'The company was succesfully updated'

   
   def get_context_data(self, **kwargs):
      context = super().get_context_data(**kwargs)      
      company = Company.objects.get(pk=self.kwargs['pk'])
      context["industries"] = Industry.objects.all()
      context["supersectors"] = Supersector.objects.all()
      context["sectors"] = Sector.objects.all()
      context["subsectors"] = Subsector.objects.all()      
      context['subsector'] =  company.subsector.id
      context['sector'] = company.subsector.sector.id
      context['supersector'] = company.subsector.sector.supersector.id
      context['industry'] = company.subsector.sector.supersector.industry.id
      return context




"""--------------------------------------------------------------------------------------
   Delete company
------------------------------------------------------------------------------------- """
@method_decorator(login_required, name='dispatch')
class CompanyDeleteView(SuccessMessageMixin, DeleteView):
   model = Company   
   template_name = 'companies/company_confirm_delete.html'
   success_message = 'The company was succesfully deleted'
   success_url = reverse_lazy('companies:companies')





