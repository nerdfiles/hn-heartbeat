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

    ui:
      graph: "#graph"

    onBeforeRender: () ->
      # console.log "onBeforeRender"
      # console.log d3
      # console.log Rickshaw

    onRender: () ->
      # This happens after DOM rendering.
      #
      # sd:07 09 2013.20.35.05

    className: "m--hacker"
