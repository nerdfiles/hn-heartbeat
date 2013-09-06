# Filename: apps/hacker/app.coffee
define [
  'backbone'
  'apps/hacker/show/controller'
  'msgbus'
], (Backbone, Controller, msgBus) ->

  class Router extends Backbone.Marionette.AppRouter
    appRoutes:
      "hackerapp": "start"

  msgBus.commands.setHandler "hacker:route", () ->
    new Router
      controller: API

  API =
    start: () ->
      Controller.hackerApp()
