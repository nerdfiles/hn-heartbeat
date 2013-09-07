# Filename: app.coffee
define [
  "backbone"
  "marionette"
  "msgbus"
], (Backbone, Marionette, msgBus) ->
  "use strict"

  HNHeartbeat = new Marionette.Application()

  # Define application regions
  # @note Regions need to be coherently mapped to 'apps'.
  HNHeartbeat.addRegions
    accessRegion: ".r--access"
    lookupRegion: ".r--lookup"
    loginRegion: ".r--login"
    graphRegion: ".r--graph" # Hackers will be presented in graphs, which will call Overviews
    overviewRegion: ".r--overview" # Overviews will contail Items

  # Initialize Backbone history
  HNHeartbeat.on "initialize:after", () ->
    console.log "history started"
    Backbone.history.start() unless Backbone.history.started

  # Set up routes
  HNHeartbeat.addInitializer () ->
    console.log "init routes"
    msgBus.commands.execute "hacker:route"
    msgBus.commands.execute "login:route"

  # Show regions
  msgBus.events.on "app:show:login", (view) =>
    console.log "show:login"
    HNHeartbeat.loginRegion.show view

  msgBus.events.on "app:show", (view) =>
    console.log "show"
    HNHeartbeat.graphRegion.show view

  HNHeartbeat
