# Filename: views/dashboard.coffee
define [
    "jquery"
    "underscore"
    "backbone"
    "rickshaw"
    "collections/hackers"
    "text!../../../templates/views/dashboard.tmpl.html"
  ],
  ($,_,Backbone,Rickshaw) ->
    class dashboard_view extends Backbone.View
      initialize: () ->
        console.log('another view started...')
    dashboardView = new dashboard_view
