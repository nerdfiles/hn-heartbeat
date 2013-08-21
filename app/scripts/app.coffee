define [
        "jquery"
        "underscore"
        "backbone"
        "router"
    ],
    ($,_,Backbone,Router) ->
        initialize = () ->
            Router.initialize()
        init = {initialize: initialize}
