(function() {
  define(["backbone", "marionette", "msgbus"], function(Backbone, Marionette, msgBus) {
    "use strict";
    var HNHeartbeat;
    HNHeartbeat = new Marionette.Application();
    HNHeartbeat.addRegions({
      accessRegion: ".r--access",
      graphRegion: ".r--graph",
      overviewRegion: ".r--overview",
      loginRegion: ".r--login",
      lookupRegion: ".r--lookup"
    });
    HNHeartbeat.on("initialize:after", function() {
      if (!Backbone.history.started) {
        return Backbone.history.start();
      }
    });
    HNHeartbeat.addInitializer(function() {
      return msgBus.commands.execute("graph:route");
    });
    msgBus.events.on("app:show", function(view) {
      return HNHeartbeat.graphRegion.show(view);
    });
    msgBus.events.on("app:show:access", function(view) {
      return HNHeartbeat.accessRegion.show(view);
    });
    return HNHeartbeat;
  });

}).call(this);
