define([
  'jquery',
  'router'
], function($, Router){
  'use strict'
  var router;
  var init = {
    start:function() {
      router = new Router();
      router.start();
    }
  }

  return init;
});
