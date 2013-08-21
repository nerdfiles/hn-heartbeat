(function() {
  define(["jquery", "underscore", "backbone", "router", "html"], function($, _, Backbone, Router, HTML) {
    var init, initialize;
    initialize = function() {
      return Router.initialize();
    };
    console.log(HTML);
    console.log('this');
    return init = {
      initialize: initialize
    };
  });

}).call(this);
