define [
    "jquery"
    "underscore"
    "backbone"
    "rickshaw"
  ],
  ($,_,Backbone,Rickshaw) ->
    class user_view extends Backbone.View
      initialize: () ->
        console.log('another view started...')
    userView = new user_view
