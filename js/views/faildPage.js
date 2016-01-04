define([
  'jquery',
  'backbone',
  'underscore',
  './text!templates/faild.html'
],  function($, Backbone , _ , faildPageTemplate ){
  'use strict'
  var FaildPage = Backbone.View.extend({

    template: _.template(faildPageTemplate),
    initialize: function() {
    },
    render: function(name) {
      this.$el.html(this.template({name:name}));
    }
  });
  return FaildPage;

});
