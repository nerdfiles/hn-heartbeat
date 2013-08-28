define [
  'underscore'
  'backbone'
  'apps/hacker/detail/templates'
  'views/_base'
  'msgbus'
], (_,Backbone,Templates,AppViews,msgBus) ->

  HackerView: class HackerView extends AppViews.ItemView
    template: _.template(Templates.hackerdetail)
    # events:
      # "hover": () -> msgBus.events.trigger 'detail:hacker:clicked'

  Layout: class Layout extends AppViews.Layout

    template: _.template(Templates.layout)

    regions:
      lookup: '#lookupBar'

  Lookup: class LookupView extends AppViews.ItemView

    el: '#lookupBar'

    events:
      'change #lookupHacker': 'lookup'

    initialize: () ->
      msgBus.events.on 'lookup:user', (user) =>
        @.$('#lookupHacker').val(user)

    lookup: () ->

      lookupUser = @.$('#lookupUser').val().trim()

      console.log "lookup: #{lookupUser}"

      if lookupUser.length > 0
        msgBus.events.trigger 'lookup:user', lookupUser
      else
        msgBus.events.trigger 'lookup:noLookupUser'
