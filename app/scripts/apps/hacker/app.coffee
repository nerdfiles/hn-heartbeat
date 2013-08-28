define [
  'marionette'
  'apps/hacker/detail/controller'
  'msgbus'
  'entities/hacker'
], (Marionette,Controller,msgBus) ->

  msgBus.events.on 'lookup:user', (user) ->
    Backbone.history.navigate 'lookup/' + user

  defaultUser = 'pg'

  user = msgBus.reqres.request 'hacker:entites'

  class Router extends Marionette.AppRouter
    appRoutes:
      '': 'defaultLookup'
      'lookup/:user': 'lookup'

  msgBus.commands.setHandler 'hacker:route', () ->
    new Router
      controller: API

  API =
    lookup: (user) ->
      msgBus.events.trigger 'lookup:user', user

    defaultLookup: () ->
      API.lookup hacker.previousLookup or defaultUser

    showHackerDetail: (user) ->
      Controller.showHackerDetail(user)
