# Filename: apps/hacker/controller.coffee
define [
  "apps/hacker/views"
  "msgbus"
], (Views, msgBus) ->
  "use strict"

  "app.hacker": () ->
    view = new Views.Hacker
    msgBus.events.trigger "app:show", view
