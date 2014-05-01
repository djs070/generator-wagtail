ALLOWED_HOSTS = ['107.170.158.167',]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'storyhaus.sqlite',
        'CONN_MAX_AGE': 600,  # number of seconds database connections should persist for
    }
}
