# Filename: apps/login/apps.coffee
define [
  "backbone"
  "apps/login/controller"
  "msgBus"
], (Backbone, Controller, msgBus) ->
  "use strict"

  # Specify controllers
  class Router extends Backbone.Marionette.AppRouter
    appRoutes:
      "app.login": "start"

  # Link controllers to routes
  msgBus.commands.setHandler "login:route", () ->
    new Router
      controller: API

  # Declare API
  API =
    start: () ->
      Controller["app.login"]()
