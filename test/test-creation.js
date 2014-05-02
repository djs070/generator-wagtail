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
    var appName = "myapp";
    var expected = [
      'manage.py',
      'requirements/base.txt',
      'requirements/dev.txt',
      'requirements/production.txt',
      projectName + '/__init__.py',
      projectName + '/urls.py',
      projectName + '/wsgi.py',
      projectName + '/wsgi_production.py',
      projectName + '/settings/__init__.py',
      projectName + '/settings/base.py',
      projectName + '/settings/dev.py',
      projectName + '/settings/local.py.example',
      projectName + '/settings/production.py',
      appName + '/__init__.py',
      appName + '/models.py'
    ];

    helpers.mockPrompt(this.app, {
      'projectName': projectName,
      "appName": appName
    });
    this.app.options['skip-install'] = true;
    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });
  });
});
