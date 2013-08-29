define [
	'marionette'
	'apps/hacker/detail/controller'
	'msgbus'
	'entities/hacker'
], (Marionette, Controller, msgBus) ->

  msgBus.events.on 'lookup:user', (user) ->
    Backbone.history.navigate 'lookup/' + user

	# Set default lookup user
  defaultUser = ''

	# the hacker lookup application uses this PRIVATE hacker custom collection 
	# class as defined in the entities/hacker module (required above)
	# nerdfiles, sd:29 08 2013.00.52.11
  user = msgBus.reqres.request 'hacker:entities'

	# declare custom routes
  class Router extends Marionette.AppRouter
    appRoutes:
      '': 'defaultLookup'
      'lookup/:user': 'lookup'

	# hookup API to routes for main app
  msgBus.commands.setHandler 'hacker:route', () ->
    new Router
      controller: API

  API =
    lookup: (user) ->
    	Controller.getHacker
    	msgBus.events.trigger 'lookup:user', user

    defaultLookup: () ->
      API.lookup hacker.previousLookup or defaultUser

    showHackerDetail: (user) ->
      Controller.showHackerDetail(user)
