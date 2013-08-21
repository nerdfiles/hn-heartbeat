define [
        "jquery"
        "underscore"
        "backbone"
        "router"
        "html"
    ],
    ($,_,Backbone,Router,HTML) ->
        initialize = () ->
        	Router.initialize()
        console.log HTML
        console.log 'this'
        init = {initialize: initialize}
