(function() {
  define(["views/home"], function(HomeView) {
    "use strict";
    var init, initialize;
    initialize = function() {
      return {
        logAction: function(action) {
          console.log(action);
          return app.content.show(new HomeView);
        }
      };
    };
    return init = {
      initialize: initialize
    };
  });

}).call(this);
