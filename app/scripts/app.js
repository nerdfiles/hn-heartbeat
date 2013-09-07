(function() {
  define(['backbone', 'marionette', 'msgbus'], function(Backbone, Marionette, msgBus) {
    "use strict";
    var HNHeartbeat,
      _this = this;
    HNHeartbeat = new Marionette.Application();
    HNHeartbeat.addRegions({
      accessRegion: '#access-region',
      headerRegion: '#header-region',
      lookupRegion: '#lookup-region',
      loginRegion: '#login-region',
      graphRegion: '#graph-region',
      overviewRegion: '#overview-region'
    });
    HNHeartbeat.on("initialize:after", function() {
      if (!Backbone.history.started) {
        return Backbone.history.start();
      }
    });
    HNHeartbeat.addInitializer(function() {
      msgBus.commands.execute("hacker:route");
      return msgBus.commands.execute("login:route");
    });
    msgBus.events.on("app:show:login", function(view) {
      return HNHeartbeat.loginRegion.show(view);
    });
    msgBus.events.on("app:show", function(view) {
      return HNHeartbeat.graphRegion.show(view);
    });
    return HNHeartbeat;
  });

}).call(this);
