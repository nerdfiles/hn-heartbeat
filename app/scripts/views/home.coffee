define [
        "jquery"
        "underscore"
        "backbone"
        "bootstrap"
        "text!../../../templates/views/home.tmpl.haml"
    ],
    ($,_,Backbone,HTML,HomeViewTemplate) ->
      class home_view extends Backbone.View
        initialize: () ->
        	console.log 'home view'
        homeView = new home_view
