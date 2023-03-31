"""--------------------------------------------------------------------------------------
    Imports
--------------------------------------------------------------------------------------"""
from pathlib import Path




"""--------------------------------------------------------------------------------------
    Build paths inside the project like this: BASE_DIR / 'subdir'
--------------------------------------------------------------------------------------"""
BASE_DIR = Path(__file__).resolve().parent.parent




"""--------------------------------------------------------------------------------------
    SECURITY WARNING: keep the secret key used in production secret!
--------------------------------------------------------------------------------------"""
SECRET_KEY = 'django-insecure-gln4$es2+9_qw2a+qu*fbhl+a&b&#sr-hn=!o-f%j2h-b@7dvi'




"""--------------------------------------------------------------------------------------
    SECURITY WARNING: don't run with debug turned on in production!
--------------------------------------------------------------------------------------"""
DEBUG = True

ALLOWED_HOSTS = []




"""--------------------------------------------------------------------------------------
    Application definition
--------------------------------------------------------------------------------------"""
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'mathfilters',
    'general',   
    'elements',  
    'relations_tree',  
    'evaluations',
    'companies',
    'countries',
    'industries',
    'accounts',
    'user_profile',
    'decorators',
    'users',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'intracen_django.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [BASE_DIR/'templates'],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'intracen_django.wsgi.application'




"""--------------------------------------------------------------------------------------
    Database
--------------------------------------------------------------------------------------"""
"""DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}
"""

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': 'intracen-django-tri',
        'USER': 'root',
        'PASSWORD': '',
        'HOST': '127.0.0.1',
        'PORT': '3306'
    }
}




"""--------------------------------------------------------------------------------------
    Password validation
--------------------------------------------------------------------------------------"""
AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]




"""--------------------------------------------------------------------------------------
    Internationalization
--------------------------------------------------------------------------------------"""
LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_TZ = True




"""--------------------------------------------------------------------------------------
    Static files (CSS, JavaScript, Images)
--------------------------------------------------------------------------------------"""
STATIC_URL = 'static/'




"""--------------------------------------------------------------------------------------
    Default primary key field type
--------------------------------------------------------------------------------------"""
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'




"""--------------------------------------------------------------------------------------
    After succesful login, redirect to root
--------------------------------------------------------------------------------------"""
LOGIN_REDIRECT_URL = "evaluations:evaluations"
LOGOUT_REDIRECT_URL = "login"




"""--------------------------------------------------------------------------------------
    Email configuration
--------------------------------------------------------------------------------------"""
EMAIL_BACKEND = "django.core.mail.backends.filebased.EmailBackend"
EMAIL_FILE_PATH = BASE_DIR / "sent_emails"











