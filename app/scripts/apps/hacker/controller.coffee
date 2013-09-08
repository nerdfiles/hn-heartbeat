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
    # @reading
    #   http://www.trinity.edu/cbrown/time/mctaggart.html
    #
    #   i'm waiting to take a shower
    #   the washing machine is on
    #   it's only 10 30 a.m.
    #   what have i done so far
    #   i ate breakfast
    #   should i buy a pair of black jeans
    #   they're too hot for summer
    #   but summer's almost over
    #   ­ field mice, matthew savoca
    #
    # So we're isolating the graph rendering to the controller, and 
    # manipulating it there. Could we pass it into the view? What's cleanest ?
    # @review
    #   https://github.com/marionettejs/backbone.marionette/blob/master/docs/marionette.view.md
    #
    # sd:07 09 2013.20.55.42

    [elem+1 for elem in [1,2,3]].pop() # returns [2,3,4]

    # @spec
    # sd:08 09 2013.13.44.05
    __json =
      JSON_from_where:
        json__: {}

    # This data should come from the Heartbeat model which is 1:1 with each Hacker.
    # 
    # We first call the Backbone App's Controller to request the data via 
    # HTTP/REST and then cache those results at the frontend, which can 
    # decide either to hit the Django Route/View to request for a new 
    # serialization of the Hacker via Hacker News' Search API pulled into 
    # Django REST Framework's serializers. There results will be cached 
    # before new HTTP commands are issued to HN's Search API.
    #
    # sd:08 09 2013.13.48.21
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

    console.log  __json.JSON_from_where.json__
    console.log [__json.JSON_from_where.json__]

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
