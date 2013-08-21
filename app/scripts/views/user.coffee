define [
        "jquery"
        "underscore"
        "backbone"
        "d3"
        "rickshaw"
    ],
    ($,_,Backbone) ->
            class starter extends Backbone.View
                initialize: ->
                    console.log('another view started...');
            starterView = new starter
