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
        	console.log html
        homeView = new home_view
