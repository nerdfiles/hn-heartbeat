# Filename: modules/graph/module.coffee
define [
  "marionette"
  "modules/graph/controller"
  "msgbus"
  "entities/hacker"
], (Marionette, Controller, msgBus) ->
  "use strict"

  # Primary call to action event to look for a user from the desire social network
  msgBus.events.on "lookup:user", (user) ->
    Backbone.history.navigate "lookup/" + user

  # Specify entities to be used
  hacker = msgBus.reqres.request "hacker:entities"

  # Specify controllers to routes
  class Router extends Backbone.Marionette.AppRouter
    appRoutes:
      "": "graphOverview"
      "lookup/:username": "graphUser"

  # msgBus.events.on "lookup:hacker", (user) ->
  #     API.graphUser user

  # Link controllers to routes
  msgBus.commands.setHandler "graph:route", () ->
    new Router
      controller: API

  # Declare internal API to be used across apps/modules
  API =

    # Overview Graph
    graphOverview: () ->

      Controller.showGraph()

    # User Graph Lookup
    graphUser: (username) ->

      Controller.showUserGraph hacker

      msgBus.events.trigger "lookup:user", username
