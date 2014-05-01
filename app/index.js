'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var sh = require('execSync');


var WagtailGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      sh.run('chmod +x manage.py');
      console.log('All done! Make sure you\'re in a virtualenv then `pip install -r requirements/base.txt`');
    });
  },

  askFor: function () {
    var done = this.async();

    // have Yeoman greet the user
    this.log(this.yeoman);

    // replace it with a short and sweet description of your generator
    this.log(chalk.magenta('You\'re using the fantastic Wagtail generator.'));

    var prompts = [{
      name: 'projectName',
      message: 'What do you want to name your project (lowercase letters only)?'
    },
    {
      name: 'appName',
      message: 'What do you want to name the inital app (only a-z again)?'
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;
      this.appName = props.appName;

      var secretKey = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-_$%#*!()";
      for( var i=0; i < 32; i++ ) {
        secretKey += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      console.log(secretKey);
      this.secretKey = secretKey;
      done();
    }.bind(this));
  },

  // Create the django project directory and files
  createProject: function(){
    // Copy contents of requirements directory and other helper files
    this.template('_manage.py', 'manage.py');
    this.directory('requirements');
    this.mkdir('static');

    // Create the project module
    this.mkdir(this.projectName);
    this.copy('__init__.py', this.projectName + '/__init__.py');
    this.copy('project/urls.py', this.projectName + '/urls.py');

    // Settings
    this.template('project/settings/_base.py', this.projectName + '/settings/base.py');
    this.copy('project/settings/__init__.py', this.projectName + '/settings/__init__.py')
    this.copy('project/settings/dev.py', this.projectName + '/settings/dev.py')
    this.copy('project/settings/local.py.example', this.projectName + '/settings/local.py.example');
    this.copy('project/settings/production.py', this.projectName + '/settings/production.py');

    // wsgi files
    this.template('project/_wsgi.py', this.projectName + '/wsgi.py')
    this.template('project/_wsgi_production.py', this.projectName + '/wsgi_production.py')
  },

  createApp: function () {
    this.mkdir(this.appName);
    this.copy('__init__.py', this.appName + '/__init__.py');

    this.template('app/_models.py', this.appName + '/models.py');

    this.mkdir(this.appName + '/templates');
    this.mkdir(this.appName + '/templates/' + this.appName);

    this.mkdir(this.appName + '/fixtures');
    this.mkdir(this.appName + '/migrations');

    this.mkdir(this.appName + '/static');
    this.mkdir(this.appName + '/static/css');
    this.mkdir(this.appName + '/static/fonts');
    this.mkdir(this.appName + '/static/images');
    this.mkdir(this.appName + '/static/js');
  }
});

module.exports = WagtailGenerator;
