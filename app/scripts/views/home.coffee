define [
        "jquery"
        "underscore"
        "backbone"
        "bootstrap"
    ],
    ($,_,Backbone) ->
				class starter extends Backbone.View
						initialize: () ->
								console.log 'Home!'

				starterView = new starter
