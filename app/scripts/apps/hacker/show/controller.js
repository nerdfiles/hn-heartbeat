(function() {
  define(["apps/hacker/show/views", "msgbus"], function(Views, msgBus) {
    return {
      hackerApp: function() {
        var view;
        view = new Views.Hacker;
        return msgBus.events.trigger("app:show", view);
      }
    };
  });

}).call(this);
