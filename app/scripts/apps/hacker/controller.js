(function() {
  define(["apps/hacker/views", "msgbus"], function(Views, msgBus) {
    "use strict";
    return {
      "app.hacker": function() {
        var view;
        view = new Views.Hacker;
        return msgBus.events.trigger("app:show", view);
      }
    };
  });

}).call(this);
