# Development settings
import os

from base import *

DEBUG = True
TEMPLATE_DEBUG = DEBUG

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'hn_heartbeat',
        'USER': 'nerdfiles',
        'PASSWORD': '',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}
