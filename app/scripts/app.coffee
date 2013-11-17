# Filename: app.coffee
# Author: nerdfiles (tw: @filesofnerds, e-mail: nerdfiles@gmail.com)
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
    graphRegion: ".r--graph" # Hackers will be presented in graphs, which will call Overviews
    overviewRegion: ".r--overview" # Overviews will contail Items
    loginRegion: ".r--login"
    lookupRegion: ".r--lookup"

  # Initialize Backbone history
  HNHeartbeat.on "initialize:after", () ->
    Backbone.history.start() unless Backbone.history.started

  # Set up routes
  HNHeartbeat.addInitializer () ->
    # msgBus.commands.execute "access:route"
    msgBus.commands.execute "graph:route"
    # msgBus.commands.execute "overview:route"
    # msgBus.commands.execute "login:route"

  # Specify events for views per region
  # @note A controller might specify events here
  # msgBus.events.on "app:show:login", (view) =>
  #   HNHeartbeat.loginRegion.show view

  msgBus.events.on "app:show", (view) =>
    HNHeartbeat.graphRegion.show view

  HNHeartbeat
