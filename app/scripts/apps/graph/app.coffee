# Filename: apps/graph/app.coffee
define [
  "marionette"
  "apps/graph/controller"
  "msgbus"
  "entities/hacker"
], (Marionette, Controller, msgBus) ->
  "use strict"

  # Primary call to action event to look for a user from the desire social network
  msgBus.events.on "lookup:user", (user) ->
    Backbone.history.navigate "lookup/" + user

  # Specify entities to be used
  hacker = msgBus.reqres.request = "hacker:entities"

  # Specify controllers to routes
  class Router extends Backbone.Marionette.AppRouter
    appRoutes:
      "": "overview"
      "lookup/:username": "lookup"

  msgBus.events.on "lookup:hacker", (hacker) ->
      API.showUserGraph hacker

  # Link controllers to routes
  msgBus.commands.setHandler "graph:route", () ->
    new Router
      controller: API

  # Declare internal API to be used across apps/modules
  API =
    overview: () ->
      console.log 'overview'
      Controller.showGraph()
    lookup: (username) ->
      # Call lookup!
      # Controller.showGraph hackers
      msgBus.events.trigger "lookup:user", username
    showUserGraph: (hacker) ->
      Controller.showUserGraphView(hacker)
