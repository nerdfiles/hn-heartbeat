(function() {
  define(["modules/login/views", "msgBus"], function(Views, msgBus) {
    "use strict";
    return {
      "app.login": function() {
        var view;
        view = new Views.Login;
        return msgBus.events.trigger("app:show:login", view);
      }
    };
  });

}).call(this);
