define [
  'msgbus'
  'marionette'
  'apps/hacker/detail/controller'
], (msgBus, Marionette, Controller) ->
	'use strict'

	class Router extends Marionette.AppRouter
		appRoutes:
			"": "defaultLookup"
			"lookup/:user": "lookup"
