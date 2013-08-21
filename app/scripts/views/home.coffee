define [
        "jquery"
        "underscore"
        "backbone"
        "html"
        "text!../../../templates/views/home.tmpl.haml"
        "bootstrap"
    ],
    ($,_,Backbone,HTML,HomeViewTemplate) ->
      class home_view extends Backbone.View
        initialize: () ->
        	console.log 'home view'
        	console.log HTML
        homeView = new home_view
