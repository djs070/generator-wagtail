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
      console.log('All done!');
      console.log('Where to from here?');
      console.log('- Make sure you\'re in a virtualenv then `pip install -r requirements/base.txt`');
      console.log('- Optionally edit your project settings, app models etc');
      console.log('- Create the database and superuser with ./manage.py syncdb');
      console.log('- Migrate with ./manage.py migratedb');
      console.log('- Run the development server with ./manage.py runserver');
      console.log('\t then visit your site at http://127.0.0.1:8000,');
      console.log('\t and login at http://127.0.0.1:8000/admin');
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
    }];

    this.prompt(prompts, function (props) {
      this.projectName = props.projectName;

      var secretKey = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-_$%#*!()";
      for( var i=0; i < 50; i++ ) {
        secretKey += possible.charAt(Math.floor(Math.random() * possible.length));
      }
      this.secretKey = secretKey;
      done();
    }.bind(this));
  },

  // Create the django project directory and files
  createProject: function(){
    // Copy contents of requirements directory and other helper files
    this.directoy('docs');  // todo template
    this.directoy('vagrant');
    this.copy('gitignore', '.gitignore');
    this.copy('fabfile.py'); // todo template
    this.copy('readme.rst'); // todo template
    this.copy('requirements.txt');
    this.copy('Vagrantfile'); // todo template

    // Create the project module
    this.mkdir(this.projectName);
    this.template('project/_manage.py', 'manage.py');

    // Copy core app
    this.directory('project/core', this.projectName + '/core');

    // Create our new custom app
    var appDir = this.projectName + '/' + this.projectName;
    this.mkdir(appDir);
    this.copy('__init__.py', appDir + '/__init__.py');
    this.copy('app/urls.py', appDir + '/urls.py');
    this.template('app/_wsgi.py', appDir + '/wsgi.py'); // todo template

    // Static dir
    var staticDir = projectName + '/static';
    this.mkdir(staticDir);
    this.mkdir(staticDir + '/css');
    this.mkdir(staticDir + '/js');
    this.copy('static/project.css', staticDir + '/css/' + projectName + '.scss')
    this.copy('static/project.js', staticDir + '/js/' + projectName + '.js')

    // Templates dir
    var templatesDir = projectName + '/templates';
    this.mkdir(templatesDir);
    this.copy('templates/404.html', templatesDir + '/404.html');
    this.copy('templates/500.html', templatesDir + '/500.html');
    this.template('templates/_base.html', templatesDir + '/base.html'); // Todo template
  }
});

module.exports = WagtailGenerator;
