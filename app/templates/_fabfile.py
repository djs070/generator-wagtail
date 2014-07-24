from fabric.api import *


env.roledefs = {
    'app': [],
}


@roles('app')
def deploy():
    # Remove this line when you're happy that this Fabfile is correct
    raise RuntimeError("Please check the fabfile before using it")

    base_dir = '/usr/local/django/<%= projectName %>'
    virtualenv_dir = '/usr/local/django/virtualenvs/<%= projectName %>'
    python = virtualenv_dir + '/bin/python'
    pip = virtualenv_dir + '/bin/pip'

    user = '<%= projectName %>'
    supervisor_task = '<%= projectName %>'

    with cd(base_dir):
        with settings(sudo_user=user):
            sudo('git pull origin master')
            sudo(pip + ' install -r requirements/production.txt')
            sudo(python + ' <%= projectName %>/manage.py syncdb --settings=<%= projectName %>.settings.production --noinput')
            sudo(python + ' <%= projectName %>/manage.py migrate --settings=<%= projectName %>.settings.production --noinput')
            sudo(python + ' <%= projectName %>/manage.py collectstatic --settings=<%= projectName %>.settings.production --noinput')
            sudo(python + ' <%= projectName %>/manage.py compress --settings=<%= projectName %>.settings.production')
            sudo(python + ' <%= projectName %>/manage.py update_index --settings=<%= projectName %>.settings.production')

    sudo('supervisorctl restart ' + supervisor_task)
