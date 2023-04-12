# --- Imports ---
from django.test import TestCase, RequestFactory, LiveServerTestCase
from django.urls import reverse
from django.contrib.auth.models import User
from user_profile.models import Profile, UserType
from elements.models import Element
from general.models import Letter
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
import random, time




# --- Tests of the views classess
class TestViews(TestCase):
    @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='user_1', password='password_')
        user_type = UserType.objects.create(type=4, name='general_user')        
        user.type = user_type        
        user.save()

        letters = ['A', 'B', 'C', 'D', 'E', 'F']
        number_of_elements = 15
        
        for element in range(number_of_elements):        
            let = Letter.objects.create(name=random.choice(letters))
            ele_name = f'Element {element}'            
            Element.objects.create(
                element_type='competences',
                letter = let,
                name= ele_name,                
            )            

    def test_view_url_exists_at_desired_location(self):
        login = self.client.login(username='user_1', password='password_')
        response = self.client.get('/elements/list/elements/element/')
        self.assertEqual(response.status_code, 200)

    def test_view_url_accessible_by_name(self):
        login = self.client.login(username='user_1', password='password_')
        response = self.client.get(reverse('elements:elements', kwargs={'element':'competences', 'singular':'competence'}))
        self.assertEqual(response.status_code, 200)

    def test_view_uses_correct_template(self):
        login = self.client.login(username='user_1', password='password_')
        response = self.client.get(reverse('elements:elements', kwargs={'element':'competences', 'singular':'competence'}))
        self.assertEqual(response.status_code, 200)
        self.assertTemplateUsed(response, 'elements/list.html')    

    def test_lists_all_authors(self):
        # Get second page and confirm it has (exactly) remaining 3 items        
        login = self.client.login(username='user_1', password='password_')
        response = self.client.get(reverse('elements:elements', kwargs={'element':'competences', 'singular':'competence'}))
        self.assertEqual(response.status_code, 200)        
        self.assertEqual(len(response.context['object_list']), 15)



# --- Selenium login
class SeleniumLogin(LiveServerTestCase):    
    @classmethod
    def setUpClass(cls):
        cls.selenium = webdriver.Chrome()
        super(SeleniumLogin, cls).setUpClass()

    @classmethod
    def tearDownClass(cls):
        super(SeleniumLogin, cls).tearDownClass()
        cls.selenium.quit()

    """ @classmethod
    def setUpTestData(cls):
        user = User.objects.create_user(username='user_1', password='password_')
        user_type = UserType.objects.create(type=4, name='general_user')        
        user.type = user_type        
        user.save() """

    def test_element_main_page(self):
        User.objects.create_user(username='user_1', password='password_')
        self.selenium.get(self.live_server_url + '/accounts/login/')
                        
        username = self.selenium.find_element(By.ID, 'id_username')
        password = self.selenium.find_element(By.ID, 'id_password')
        button = self.selenium.find_element(By.ID, 'button_login')
                
        username.clear()
        password.clear()
        username.send_keys('user_1')
        password.send_keys('password_')

        print(f"Username: {username.get_attribute('value')} - Password: {password.get_attribute('value')}")

        time.sleep(2)
        button.send_keys(Keys.RETURN)
        time.sleep(4)

        self.assertEqual(self.selenium.find_element(By.ID, 'div_title'))



# --- View element with Selenium
class SeleniumViewElement(LiveServerTestCase):    
    @classmethod
    def setUpClass(cls):
        cls.selenium = webdriver.Chrome()
        super(SeleniumViewElement, cls).setUpClass()

    @classmethod
    def tearDownClass(cls):
        super(SeleniumViewElement, cls).tearDownClass()
        cls.selenium.quit()    

    def test_element_main_page(self):
        login = self.client.login(username='user_1', password='password_')

        self.selenium.get(self.live_server_url + reverse('elements:elements', kwargs={'element':'competences', 'singular':'competence'}))
        
        print(f"Current url: {self.selenium.current_url}")

        input_text = self.selenium.find_element(By.ID, 'select_letters')
        print(f"Text: {input_text.get_attribute('value')}")

        self.assertEqual(input_text.get_attribute('value'), '0')
        






