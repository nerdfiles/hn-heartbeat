define [
        "jquery"
        "underscore"
        "backbone"
        "bootstrap"
        "html"
        "text!../../../templates/views/home.tmpl.haml"
    ],
    ($,_,Backbone,HTML,HomeViewTemplate) ->
      class home_view extends Backbone.View
        initialize: () ->
        	console.log HTML
        homeView = new home_view
