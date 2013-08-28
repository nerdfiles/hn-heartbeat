(function() {
  define(['backbone', 'marionette', 'msgbus'], function(Backbone, Marionette, msgBus) {
    var HNHeartbeat,
      _this = this;
    HNHeartbeat = new Marionette.Application();
    HNHeartbeat.addRegions({
      accessRegion: '#access-region',
      headerRegion: '#header-region',
      mainRegion: '#main-region',
      lookupRegion: '#lookup-region'
    });
    HNHeartbeat.on('initialize:after', function() {
      if (!Backbone.history.started) {
        return Backbone.history.start();
      }
    });
    HNHeartbeat.addInitializer(function() {
      return msgBus.commands.execute('hacker:route');
    });
    msgBus.events.on('app:show', function(view) {
      HNHeartbeat.mainRegion.show(view);
      return HNHeartbeat.loginRegion.show(view);
    });
    return HNHeartbeat;
  });

}).call(this);
