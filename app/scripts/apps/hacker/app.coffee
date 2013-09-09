# Filename: apps/hacker/app.coffee
define [
  "backbone"
  "apps/hacker/controller"
  "msgbus"
  "entities/hacker"
], (Backbone, Controller, msgBus) ->
  "use strict"

  msgBus.events.on "lookup:user", (user) ->
    Backbone.history.navigate ".lookup/" + user

  user = msgBus.reqres.request = "hacker:entities"

  # Specify controllers to routes
  class Router extends Backbone.Marionette.AppRouter
    appRoutes:
      "": "overview"
      ".hacker": "start"
      ".lookup/:username": "lookup"

  # Link controllers to routes
  msgBus.commands.setHandler "hacker:route", () ->
    new Router
      controller: API

  # Declare API
  API =
    overview: () ->
      Controller["overview"]()

    lookup: (username) ->
      msgBus.events.trigger "lookup:user", username

    start: () ->
      Controller["app.hacker"]()
