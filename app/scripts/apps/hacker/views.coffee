# Filename: apps/hacker/views.coffee
define [
  "d3"
  "rickshaw"
  "apps/hacker/templates"
  "views/_base"
  "msgbus"
], (D3, rickshaw, Templates, AppViews, msgBus) ->
  "use strict"

  Hacker: class View extends AppViews.ItemView

    template: _.template Templates["hacker.view"]

    onBeforeRender: () ->
      # console.log "onBeforeRender"
      # console.log d3
      # console.log Rickshaw

    className: "m--hacker"
