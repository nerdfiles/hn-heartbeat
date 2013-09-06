# Filename: apps/hacker/views.coffee
define [
  'apps/hacker/show/templates'
  'views/_base'
  'msgbus'
], (Templates, AppViews, msgBus) ->
  Hacker: class View extends AppViews.ItemView
    template: _.template Templates.hackerView
    className: "hackerView"
