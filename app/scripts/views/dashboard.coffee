define [
    "jquery"
    "underscore"
    "backbone"
    "rickshaw"
  ],
  ($,_,Backbone,Rickshaw) ->
    class dashboard_view extends Backbone.View
      initialize: () ->
        console.log('another view started...')
    dashboardView = new dashboard_view
