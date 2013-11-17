# Filename: modules/login/controller.coffee
define [
  "modules/login/views"
  "msgBus"
], (Views, msgBus) ->
  "use strict"

  "app.login": () ->
    view = new Views.Login
    msgBus.events.trigger "app:show:login", view
