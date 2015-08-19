/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp({
  lessOptions: {
    paths: [
      'bower_components/bootstrap/less'
    ]
  }

});

// import js from vendors
app.import('bower_components/bootstrap/dist/js/bootstrap.min.js');
app.import('bower_components/nprogress/nprogress.js');
app.import('bower_components/lodash/lodash.min.js');
app.import('bower_components/moment/min/moment.min.js');
//app.import('bower_components/ember/ember-template-compiler.js');
app.import('vendor/dist/js/Chart.js');
app.import('vendor/dist/js/bootstrap-filestyle.min.js');
app.import('vendor/dist/js/uploads-item.js');

// import css from vendors
app.import('bower_components/nprogress/nprogress.css');

//app.import('bower_components/ember-validations/index.js');
//app.import('bower_components/ember-easy-form-extensions/index.js');

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

module.exports = app.toTree();
