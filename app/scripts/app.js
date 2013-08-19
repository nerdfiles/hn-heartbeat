(function() {
  define(["jquery", "underscore", "backbone", "router"], function($, _, Backbone, Router) {
    var init, initialize;
    initialize = function() {
      return Router.initialize();
    };
    return init = {
      initialize: initialize
    };
  });

}).call(this);
