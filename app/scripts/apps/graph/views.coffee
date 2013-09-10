# Filename: apps/graph/views.coffee
define [
  "apps/graph/templates"
  "views/_base"
  "msgbus"
], (Templates, AppViews, msgBus) ->
  "use strict"

  Layout: class Layout extends AppViews.Layout
    template: _.template(Templates.layout)
    regions:
      lookup: ".r--lookup"
      graph: ".r--graph"

  Lookup: class View extends AppViews.ItemView
    el: "#lookup"
    events:
      "change #lookupUser": "lookup"
    initialize: () ->
      msgBus.events.on "lookup:user", (user) =>
        @.$("#lookupUser").val(user)
    lookup: () ->
      username = @.$("#lookupUser").val().trim()

      if username.length > 0
        msgBus.events.trigger "lookup:user", username
      else
        msgBus.events.trigger "lookup:noUsername"

  Hacker: class View extends AppViews.ItemView
    template: _.template Templates["graph"]
    ui:
      graph: "#graph"
    onBeforeRender: () ->
      # console.log "onBeforeRender"
      # console.log d3
      # console.log Rickshaw
    onRender: () ->
      # This happens before DOM rendering (before elements are available 
      # for selection.
      #
      # sd:07 09 2013.20.35.05
    className: "m--hacker"
