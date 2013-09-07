# Filename: app.coffee
define [
  'backbone'
  'marionette'
  'msgbus'
], (Backbone, Marionette, msgBus) ->
  "use strict"

  HNHeartbeat = new Marionette.Application()

  # Define application regions
  # @note Regions need to be coherently mapped to 'apps'.
  HNHeartbeat.addRegions
    accessRegion: '#access-region'
    headerRegion: '#header-region'
    lookupRegion: '#lookup-region'
    loginRegion: '#login-region'
    graphRegion: '#graph-region' # Hackers will be presented in graphs, which will call Overviews
    overviewRegion: '#overview-region' # Overviews will contail Items

  # Initialize Backbone history
  HNHeartbeat.on "initialize:after", () ->
    Backbone.history.start() unless Backbone.history.started

  # Set up routes
  HNHeartbeat.addInitializer () ->
    msgBus.commands.execute "hacker:route"
    msgBus.commands.execute "login:route"

  # Show regions
  msgBus.events.on "app:show:login", (view) =>
    HNHeartbeat.loginRegion.show view

  msgBus.events.on "app:show", (view) =>
    HNHeartbeat.graphRegion.show view

  HNHeartbeat
