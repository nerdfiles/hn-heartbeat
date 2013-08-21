define [
        "jquery"
        "underscore"
        "backbone"
        "bootstrap"
        "text!../../../templates/views/home.tmpl.haml"
    ],
    ($,_,Backbone,HomeViewTemplate) ->
      class home_view extends Backbone.View
        initialize: () ->
          console.log 'cats'
          console.log 'Home!'
        homeView = new home_view
