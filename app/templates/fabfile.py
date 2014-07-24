from fabric.api import *


env.roledefs = {
    'app': [],
}


@roles('app')
def deploy():
    # Remove this line when you're happy that this Fabfile is correct
    raise RuntimeError("Please check the fabfile before using it")

    base_dir = '/usr/local/django/my_lovely_website'
    virtualenv_dir = '/usr/local/django/virtualenvs/my_lovely_website'
    python = virtualenv_dir + '/bin/python'
    pip = virtualenv_dir + '/bin/pip'

    user = 'my_lovely_website'
    supervisor_task = 'my_lovely_website'

    with cd(base_dir):
        with settings(sudo_user=user):
            sudo('git pull origin master')
            sudo(pip + ' install -r requirements/production.txt')
            sudo(python + ' my_lovely_website/manage.py syncdb --settings=my_lovely_website.settings.production --noinput')
            sudo(python + ' my_lovely_website/manage.py migrate --settings=my_lovely_website.settings.production --noinput')
            sudo(python + ' my_lovely_website/manage.py collectstatic --settings=my_lovely_website.settings.production --noinput')
            sudo(python + ' my_lovely_website/manage.py compress --settings=my_lovely_website.settings.production')
            sudo(python + ' my_lovely_website/manage.py update_index --settings=my_lovely_website.settings.production')

    sudo('supervisorctl restart ' + supervisor_task)
