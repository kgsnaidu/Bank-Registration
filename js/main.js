(function(){
  require.config({
  paths : {
    //Libraries
    'jquery': './lib/jquery.min',
    'underscore': './lib/underscore-min',
    'backbone': './lib/backbone-min',
    'bootstrap': './lib/bootstrap',
    'wizard': './lib/jquery.bootstrap.wizard.min',
    'validator': './lib/jquery.validate.min',
    'formValidation': './lib/formValidation.min',
    'bootstrapForm': './lib/bootstrap.form.min',
    'firebase': './lib/firebase',

    //AMD
    'init': './init',
    'router': './router',
    'templates': '../templates',

    //Models
    'customerModel': './models/customerModel',

    //Views
    'landingPageView': './views/landingPage',
    'wizardPageView': './views/wizardView',
    'successPage': './views/successPage',
    'faildPage': './views/faildPage'


  },
  shim : {
    'jquery': {
      exports: '$'
    },
    'underscore': {
      exports: '_'
    },
    'backbone': {
      deps: ['jquery', 'underscore'],
      exports: 'Backbone'
    },
    'bootstrap': {
      deps: ['jquery', 'underscore', 'backbone'],
      exports: 'bootstrap'
    },
    'wizard': {
      deps: ['jquery','bootstrap'],
      exports: 'wizard'
    },
    'validator':{
      deps:['jquery', 'bootstrap'],
      exports: 'validator'
    },
    'formValidation':{
      deps:['jquery', 'bootstrap', 'validator'],
      exports: 'formValidation'
    },
    'bootstrapForm':{
      deps:['jquery', 'bootstrap','formValidation', 'validator'],
      exports: 'bootstrapForm'
    },
    'firebase':{
      deps:['jquery'],
      exports: 'firebase'
    }
  }
});

define(['init'], function(init)
{
  init.start();
});

})();
