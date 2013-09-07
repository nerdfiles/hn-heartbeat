# Filename: apps/hacker/views.coffee
define [
  'apps/hacker/templates'
  'views/_base'
  'msgbus'
], (Templates, AppViews, msgBus) ->
  "use strict"

  Hacker: class View extends AppViews.ItemView
    template: _.template Templates["hacker.view"]
    className: "m--hacker"
