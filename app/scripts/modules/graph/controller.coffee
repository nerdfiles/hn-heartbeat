# Filename: modules/graph/controller.coffee
define [
  "msgbus"
  "modules/graph/views"
  "modules/access/views"
], (msgBus, Views, CommonViews) ->
  "use strict"

  showGraph: (hacker) ->

    @layout = @getLayout()
    @accessLayout = @getAccessLayout()

    @layout.on "show", () =>
      @showLookupView()
      @showGlobalGraphView()

    @accessLayout.on "show", () =>
      @showAccessView()

    msgBus.events.trigger "app:show", @layout
    msgBus.events.trigger "app:show:access", @accessLayout

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
        y: 57
      }
      {
        x: 3
        y: 17
      }
      {
        x: 4
        y: 42
      }
    ]

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
  showUserGraph: (hacker) ->
    @layout = @getLayout()
    @accessLayout = @getAccessLayout()

    @layout.on "show", () =>
      @showLookupView()
      @showUserGraphView hacker

    @accessLayout.on "show", () =>
      @showAccessView()

    msgBus.events.trigger "app:show", @layout
    msgBus.events.trigger "app:show:access", @accessLayout

  # User Graph View
  showUserGraphView: (hacker) ->
    view = @getUserGraphView hacker
    console.log '---showUserGraphView---'
    console.log hacker
    console.log '---showUserGraphView---'

    # could pass in hackers here after cached serialized data
    # sd:10 09 2013.23.01.30
    __json =
      JSON_from_where:
        json__: {}

    [__json.JSON_from_where.json__] = data = [
      {
        x: 0
        y: 50
      }
      {
        x: 1
        y: 59
      }
      {
        x: 2
        y: 57
      }
      {
        x: 3
        y: 17
      }
      {
        x: 4
        y: 42
      }
    ]

    # Too much fucken JavaScript OMFG right now
    # data = hacker.heartbeat

    @graph = new Rickshaw.Graph
      element: document.querySelector "#graph"
      # element: @ui.graph
      width: 580
      height: 250
      series: [
        {
          color: "lightblue"
          data: data
        }
      ]

    @graph.render()

  getUserGraphView: (hacker) ->
    new Views.UserGraph
      model: hacker

  showAccessView: () ->
    accessView = @getAccessView()
    @accessLayout.layout.show accessView

  getAccessView: () ->
    new CommonViews.Access

  getAccessLayout: () ->
    new CommonViews.AccessLayout

  showLookupView: () ->
    lookupView = @getLookupView()
    @layout.lookup.attachView lookupView

  getLookupView: () ->
    new Views.Lookup

  getLayout: () ->
    new Views.Layout
