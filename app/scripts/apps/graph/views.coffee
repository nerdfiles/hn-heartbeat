# Filename: apps/graph/views.coffee
define [
  "d3"
  "rickshaw"
  "apps/graph/templates"
  "views/_base"
  "msgbus"
], (D3, rickshaw, Templates, AppViews, msgBus) ->
  "use strict"

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

  GlobalGraph: class View extends AppViews.ItemView
    template: _.template Templates.graph
    ui:
      graph: "#graph"
    className: "m--global-graph"
    onBeforeRender: () ->
      # console.log "onBeforeRender"
      # console.log d3
      # console.log Rickshaw
    onRender: () ->
      # This happens before DOM rendering (before elements are available 
      # for selection.
      #
      # sd:07 09 2013.20.35.05

      @["app.graph"]()
    "app.graph": () ->

      __json =
        JSON_from_where:
          json__: {}

      [__json.JSON_from_where.json__] = data = [
        {
          x: 0
          y: 40
        }
        {
          x: 1
          y: 49
        }
        {
          x: 2
          y: 17
        }
        {
          x: 3
          y: 42
        }
      ]

      # console.log  __json.JSON_from_where.json__
      # console.log [__json.JSON_from_where.json__]

      @graph = new Rickshaw.Graph
        element: document.querySelector "#graph"
        # element: @ui.graph
        width: 580
        height: 250
        series: [
          {
            color: "steelblue"
            data: data
          }
        ]

      @graph.render()

  UserGraph: class View extends AppViews.ItemView
    template: _.template Templates.graph
    ui:
      graph: "#graph"
    className: "m--user-graph"
    onBeforeRender: () ->
      # console.log "onBeforeRender"
      # console.log d3
      # console.log Rickshaw
    onRender: () ->
      # This happens before DOM rendering (before elements are available 
      # for selection.
      #
      # sd:07 09 2013.20.35.05

  Layout: class Layout extends AppViews.Layout
    template: _.template(Templates.layout)
    regions:
      lookup: ".r--lookup"
      global: ".r--globalGraph"
