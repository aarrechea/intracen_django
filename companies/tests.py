# --- Imports ---
from django.test import TestCase, RequestFactory
from django.urls import reverse
from django.contrib.auth.models import User
from user_profile.models import Profile, UserType
from .views import CompaniesListView
from .models import Company
from .forms import CompanyForm
from countries.models import Country, Continent, Region
from industries.models import Subsector, Sector, Supersector, Industry


# --- Tests
class TestModelsCompany(TestCase):
    @classmethod
    def setUpTestData(cls):
        # Set up non-modified objects used by all test methods
        continet = Continent.objects.create(name="America")
        region = Region.objects.create(name="AUSTRALASIA")
        country = Country.objects.create(name='AUSTRALIA', inhabitants=3000, continent=continet, region=region)
        industry = Industry.objects.create(name='Industry Parts')
        supersector = Supersector.objects.create(name='Supersector Parts', industry=industry)
        sector = Sector.objects.create(name='Sector Parts', supersector=supersector)
        subsector = Subsector.objects.create(name='Subsector Parts', sector=sector)
        Company.objects.create(name='Big company', country=country, subsector=subsector)
        
    def test_name(self):
        company = Company.objects.get(id=1)
        field_label = company._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_country(self):
        company = Company.objects.get(id=1)
        field_label = company._meta.get_field('country').verbose_name        
        self.assertEqual(field_label, 'Country')

    def test_name_max_length(self):
        company = Company.objects.get(id=1)
        max_length = company._meta.get_field('name').max_length
        self.assertEqual(max_length, 150)    


# --- Form tests ---    
class FormsTest(TestCase):
    def test_check_comments_textarea(self):
        form = CompanyForm()        
        self.assertEqual(form.fields['comments'].help_text, 'Help')
        

# --- View tests
class ViewTests(TestCase):
    @classmethod
    def setUpTestData(cls):        
        user = User(username='user_1', password='password_')
        user.save()
        continet = Continent.objects.create(name="America")
        region = Region.objects.create(name="AUSTRALASIA")
        country = Country.objects.create(name='AUSTRALIA', inhabitants=3000, continent=continet, region=region)
        industry = Industry.objects.create(name='Industry Parts')
        supersector = Supersector.objects.create(name='Supersector Parts', industry=industry)
        sector = Sector.objects.create(name='Sector Parts', supersector=supersector)
        subsector = Subsector.objects.create(name='Subsector Parts', sector=sector)
        number_of_companies = 13

        for company in range(number_of_companies):
            Company.objects.create(
                name=f'Company {company}',
                country=country,
                subsector=subsector
            )

    def test_view_url_exists_at_desired_location(self):        
        response = self.client.get('/companies/')        
        self.assertEqual(response.status_code, 200)

    def test_view_url_accessible_by_name(self):
        response = self.client.get(reverse('companies:companies'))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        response = self.client.get(reverse('companies:companies'))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'companies/company_list.html')    

    def test_lists_all_authors(self):
        # Get second page and confirm it has (exactly) remaining 3 items
        response = self.client.get(reverse('companies:companies'))
        self.assertEqual(response.status_code, 200)        
        self.assertEqual(len(response.context['company_list']), 13)
