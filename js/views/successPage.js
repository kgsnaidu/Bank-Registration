define([
  'jquery',
  'backbone',
  'underscore',
  './text!templates/success.html'
],  function($, Backbone , _ , successPageTemplate ){
  'use strict'
  var SuccessPage = Backbone.View.extend({

    template: _.template(successPageTemplate),
    initialize: function() {
    },
    render: function(name) {
      this.$el.html(this.template({name:name}));
    }
  });
  return SuccessPage;

});
