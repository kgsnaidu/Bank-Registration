define([
  'jquery',
  'backbone',
  'underscore',
  './text!templates/landingPage.html'
],  function($, Backbone , _ , landingPageTemplate ){
  'use strict'
  var LandingPage = Backbone.View.extend({

    template: _.template(landingPageTemplate),
    initialize: function() {
    },
    render: function() {
      this.$el.html(this.template);
    },
    events: {
      "click #applyOnline" : "openRegistration"
    },
    openRegistration : function () {
      location.href="#/registration";
    }
  });
  return LandingPage;

});
