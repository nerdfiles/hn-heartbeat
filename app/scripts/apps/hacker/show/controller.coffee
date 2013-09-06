# Filename: apps/hacker/controller.coffee
define [
  "apps/hacker/show/views"
  "msgbus"
], (Views, msgBus) ->

  hackerApp: () ->
    view = new Views.Hacker
    msgBus.events.trigger "app:show", view
