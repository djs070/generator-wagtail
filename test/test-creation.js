/*global describe, beforeEach, it */
'use strict';
var path = require('path');
var helpers = require('yeoman-generator').test;

describe('wagtail generator', function () {
  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('wagtail:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var projectName = "myproj";
    var expected = [
      'docs/__init__.py',
      'docs/conf.py',
      'docs/deploy.rst',
      'docs/index.rst',
      'docs/install.rst',
      'docs/make.bat',
      'docs/Makefile',
      projectName + '/core/migrations/__init__.py',
      projectName + '/core/migrations/0001_initial.py',
      projectName + '/core/migrations/0002_create_homepage.py',
      projectName + '/core/templates/core/home_page.html',
      projectName + '/core/templatetags/__init__.py',
      projectName + '/core/templatetags/core_tags.py',
      projectName + '/core/__init__.py',
      projectName + '/core/models.py',
      projectName + '/' + projectName + '/settings/__init__.py',
      projectName + '/' + projectName + '/settings/base.py',
      projectName + '/' + projectName + '/settings/dev.py',
      projectName + '/' + projectName + '/settings/production.py',
      projectName + '/' + projectName + '/__init__.py',
      projectName + '/' + projectName + '/urls.py',
      projectName + '/' + projectName + '/wsgi.py',
      projectName + '/static/css/' + projectName + '.scss',
      projectName + '/static/js/' + projectName + '.js',
      projectName + '/templates/404.html',
      projectName + '/templates/500.html',
      projectName + '/templates/base.html',
      projectName + '/manage.py',
      'vagrant/provision.sh',
      '.gitignore',
      'fabfile.py',
      'readme.rst',
      'requirements.txt',
      'Vagrantfile'
    ];

    helpers.mockPrompt(this.app, {
      'projectName': projectName
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
