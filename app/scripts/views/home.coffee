define [
        "jquery"
        "underscore"
        "backbone"
        "bootstrap"
        "collections/users"
        "text!templates/views/home.tmpl.haml"
    ],
    ($,_,Backbone) ->
				class starter extends Backbone.View
						initialize: () ->
								console.log 'Home!'

				starterView = new starter
