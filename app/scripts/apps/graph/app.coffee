# Filename: apps/hacker/app.coffee
define [
  "backbone"
  "apps/graph/controller"
  "msgbus"
  "entities/hacker"
], (Backbone, Controller, msgBus) ->
  "use strict"

  # Primary call to action event to look for a user from the desire social network
  msgBus.events.on "lookup:user", (user) ->
    Backbone.history.navigate "lookup/" + user

  # Specify entities to be used
  user = msgBus.reqres.request = "hacker:entities"

  # Specify controllers to routes
  class Router extends Backbone.Marionette.AppRouter
    appRoutes:
      "": "overview"
      "graph": "graph"
      "lookup/:username": "lookup"

  # Link controllers to routes
  msgBus.commands.setHandler "graph:route", () ->
    new Router
      controller: API

  # Declare internal API to be used across apps/modules
  API =
    overview: () ->
      Controller["app.overview"]()

    lookup: (username) ->
      msgBus.events.trigger "lookup:user", username

    graph: () ->
      Controller["app.graph"]()
