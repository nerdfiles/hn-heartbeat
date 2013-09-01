# Filename: app.coffee

define [
  'backbone'
  'marionette'
  'msgbus'
], (Backbone, Marionette, msgBus) ->
  'use strict'

  HNHeartbeat = new Marionette.Application()

  # Define application regions
  HNHeartbeat.addRegions
    accessRegion: '#access-region'
    headerRegion: '#header-region'
    lookupRegion: '#lookup-region'
    loginRegion: '#login-region'
    graphRegion: '#graph-region' # Hackers will be presented in graphs, which will call Overviews
    overviewRegion: '#overview-region' # Overviews will contail Items

  # init history
  HNHeartbeat.on 'initialize:after', () ->
    Backbone.history.start() unless Backbone.history.started

  # prompt with login and generic stats on application
  HNHeartbeat.addInitializer () ->
    # msgBus.commands.execute 'login:route'
    # msgBus.commands.execute 'overview:route'
    msgBus.commands.execute 'hacker:route'

  # render views
  msgBus.events.on 'app:show', (view) =>
    # msgBus.loginRegion.show view
    # msgBus.overviewRegionshow view
    msgBus.loginRegion.show view
    msgBus.lookupRegion.show view
    msgBus.graphRegion.show view

  HNHeartbeat
