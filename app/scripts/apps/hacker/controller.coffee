# Filename: apps/hacker/controller.coffee
define [
  "d3"
  "rickshaw"
  "apps/hacker/views"
  "msgbus"
], (D3, rickshaw, Views, msgBus) ->
  "use strict"

  "app.hacker": () ->
    view = new Views.Hacker
    msgBus.events.trigger "app:show", view

    # Something Russell pretend'd ?
    # sd:07 09 2013.20.55.42
    [__json.JSON_from_where.json__] = [
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
