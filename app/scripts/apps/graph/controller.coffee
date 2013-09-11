# Filename: apps/graph/controller.coffee
define [
  "msgbus"
  "apps/graph/views"
], (msgBus, Views) ->
  "use strict"

  showGraph: (hackers) ->
    @layout = @getLayout()
    @layout.on "show", () =>
      @showLookupView()
      # @showGlobalGraphView hackers
      @showGlobalGraphView()
    msgBus.events.trigger "app:show", @layout

  # Global Graph View
  showGlobalGraphView: () ->
    view = @getGlobalGraphView()
    @layout.global.show view

    # could pass in hackers here after cached serialized data
    # sd:10 09 2013.23.01.30
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

  getGlobalGraphView: () ->
    new Views.GlobalGraph

  # User Graph View
  showUserGraphView: (hacker) ->
    view = @getUserGraphView hacker
    # view.on "dialog:button:clicked", () ->
    #   console.log @
    msgBus.events.trigger "app:show:graph", view

  getUserGraphView: (hacker) ->
    new Views.UserGraph
      model: hacker

  # Lookup View
  showLookupView: () ->
    lookupView = @getLookupView()
    @layout.lookup.attachView lookupView

  getLookupView: () ->
    new Views.Lookup

  # Layout
  getLayout: () ->
    new Views.Layout
