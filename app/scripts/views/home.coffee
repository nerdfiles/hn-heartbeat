define [
        "jquery"
        "underscore"
        "backbone"
        "bootstrap"
        "text!../../../templates/views/home.tmpl.haml"
    ],
    ($,_,Backbone,HomeViewTemplate) ->
				class starter extends Backbone.View
						initialize: () ->
								console.log 'Home!'

				starterView = new starter
