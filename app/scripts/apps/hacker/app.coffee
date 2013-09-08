# Filename: apps/hacker/app.coffee
define [
  "backbone"
  "apps/hacker/controller"
  "msgbus"
], (Backbone, Controller, msgBus) ->
  "use strict"

  # Specify controllers to routes
  class Router extends Backbone.Marionette.AppRouter
    appRoutes:
      "app.hacker": "start"

  # Link controllers to routes
  msgBus.commands.setHandler "hacker:route", () ->
    new Router
      controller: API

  # Declare API
  API =
    start: () ->
      Controller["app.hacker"]()
