# Filename: modules/user/module.coffee
define [
  "backbone"
  "modules/user/controller"
  "msgBus"
], (Backbone, Controller, msgBus) ->
  "use strict"

  # Specify controllers
  class Router extends Backbone.Marionette.AppRouter
    appRoutes:
      "user/login": "start"

  # Link controllers to routes
  msgBus.commands.setHandler "login:route", () ->
    new Router
      controller: API

  # Declare API
  API =
    start: () ->
      Controller["login"]()
