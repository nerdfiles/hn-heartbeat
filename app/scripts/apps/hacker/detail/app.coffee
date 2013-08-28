define [
  'msgbus'
  'marionette'
  'apps/hacker/detail/controller'
], (msgBus, Marionette, Controller) ->

    class Router extends Marionette.AppRouter
      appRoutes:
        "": "defaultLookup"
        "lookup/:user": "lookup"
