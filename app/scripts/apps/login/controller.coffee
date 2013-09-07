# Filename: apps/login/controller.coffee
define [
  "apps/login/views"
  "msgBus"
], (Views, msgBus) ->
  "use strict"

  "app.login": () ->
    view = new Views.Login
    msgBus.events.trigger "app:show:login", view
