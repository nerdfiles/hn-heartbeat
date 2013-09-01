define [
  'msgbus'
  'apps/hacker/detail/views'
], (msgBus, Views) ->
  'use strict'

  showHacker: (user) ->
    @layout = @getLayout()
    @layout.on 'show', =>
      @showLookupBar()
      @showHackerDetail()
    msgBus.events.trigger 'app:show', @layout

  showHackerDetail: (user) ->
    console.log 'controller :: showHackerDetail'
    view = @getDetailView user
    msgBus.events.trigger 'app:show:hacker', view

  getDetailView: (user) ->
    new Views.HackerView
      model: user

  showLookupBar: () ->
    lookupView = @getLookupView()
    @layout.lookup.attachView lookupView

  getLookupView: () ->
    new Views.Lookup

  getLayout: () ->
    new Views.Layout
