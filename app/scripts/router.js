(function() {
  define(["jquery", "underscore", "backbone", "views/home", "views/dashboard"], function($, _, Backbone, HomeView, DashboardView) {
    "use strict";
    var AppRouter, init, initialize;
    AppRouter = Backbone.Router.extend({
      routes: {
        "/user": "showUser",
        "*actions": "globalAction"
      }
    });
    initialize = function() {
      var app_router;
      app_router = new AppRouter;
      app_router.on("showUser", function() {
        var dashboardView;
        dashboardView = new DashboardView();
        return dashboardView.render();
      });
      return app_router.on("globalAction", function(actions) {
        return console.log('No route:', actions);
      });
    };
    return init = {
      initialize: initialize
    };
  });

}).call(this);
