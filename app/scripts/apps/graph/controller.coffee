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
