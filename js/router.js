define([
  "jquery",
  "underscore",
  "backbone",
  "landingPageView",
  "wizardPageView",
  "customerModel"
], function($,_,Backbone, LandingPageView, WizardView, customerModel ) {
    "use strict"
    var homePageView, wizardView, Customer = new customerModel({});
    var Router = Backbone.Router.extend({
      routes : {
        "" : "homePage",
        "registration": "startRegistration",
        "tryagain": "startRegistration"
      },
      initialize : function() {
        homePageView = new LandingPageView({el: "#content" });
      },
      homePage: function(){
        homePageView.render();
      },
      startRegistration: function(){
        wizardView = new WizardView({el:"#content", model:Customer});
        wizardView.render();
      },
      start: function()
      {
        Backbone.history.start();
      }
    });
    return Router;
});
