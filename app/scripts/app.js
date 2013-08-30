(function() {
  define(['backbone', 'marionette', 'msgbus'], function(Backbone, Marionette, msgBus) {
    'use strict';
    var HNHeartbeat,
      _this = this;
    HNHeartbeat = new Marionette.Application();
    return HNHeartbeat.addRegions({
      accessRegion: '#access-region',
      headerRegion: '#header-region',
      lookupRegion: '#lookup-region',
      loginRegion: '#login-region',
      graphRegion: '#graph-region',
      overviewRegion: '#overview-region'
    }, HNHeartbeat.on('initialize:after', function() {
      if (!Backbone.history.started) {
        return Backbone.history.start();
      }
    }), HNHeartbeat.addInitializer(function() {
      return msgBus.commands.execute('hacker:route');
    }), msgBus.events.on('app:show', function(view) {
      HNHeartbeat.loginRegion.show(view);
      return msgBus.graphRegion.show(view);
    }), HNHeartbeat);
  });

}).call(this);
