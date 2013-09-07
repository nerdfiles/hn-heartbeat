(function() {
  define(["backbone", "marionette", "msgbus"], function(Backbone, Marionette, msgBus) {
    "use strict";
    var HNHeartbeat,
      _this = this;
    HNHeartbeat = new Marionette.Application();
    HNHeartbeat.addRegions({
      accessRegion: ".r--access",
      lookupRegion: ".r--lookup",
      loginRegion: ".r--login",
      graphRegion: ".r--graph",
      overviewRegion: ".r--overview"
    });
    HNHeartbeat.on("initialize:after", function() {
      console.log("history started");
      if (!Backbone.history.started) {
        return Backbone.history.start();
      }
    });
    HNHeartbeat.addInitializer(function() {
      console.log("init routes");
      msgBus.commands.execute("hacker:route");
      return msgBus.commands.execute("login:route");
    });
    msgBus.events.on("app:show:login", function(view) {
      console.log("show:login");
      return HNHeartbeat.loginRegion.show(view);
    });
    msgBus.events.on("app:show", function(view) {
      console.log("show");
      return HNHeartbeat.graphRegion.show(view);
    });
    return HNHeartbeat;
  });

}).call(this);
