define [
        "jquery"
        "underscore"
        "backbone"
        "html"
        "text!../../../templates/views/home.tmpl.html"
        "bootstrap"
    ],
    ($,_,Backbone,HTML,HomeViewTemplate) ->
      class home_view extends Backbone.View
      	el: $ '.container'
      	render: () ->
      		data =
      			msg: "I am a cat!"
      		compiledTmpl = _.template($(HomeViewTemplate).html(), data)
      		console.log compiledTmpl
      		@$el.append compiledTmpl
      	initialize: () ->
      		@render()
      	homeView = new home_view
