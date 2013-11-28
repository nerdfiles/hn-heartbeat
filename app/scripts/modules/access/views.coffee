# Filename: modules/access/views.coffee
define [
  "modules/access/templates"
  "views/_base"
  "msgbus"
], (Templates, AppViews, msgBus) ->
  "use strict"

  AccessLayout: class Layout extends AppViews.Layout
    template: _.template Templates.layout
    regions:
      layout: ".access"

  Access: class View extends AppViews.ItemView
    template: _.template Templates.access
    events:
      'click #access': 'reveal'

    initialize: () ->
      msgBus.events.on 'access:reveal', () =>
        @.$('#access').hide()

    reveal: () ->
      msgBus.events.trigger 'access:reveal'
