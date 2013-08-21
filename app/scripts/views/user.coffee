define [
        "jquery"
        "underscore"
        "backbone"
        "d3"
        "rickshaw"
    ],
    ($,_,Backbone) ->
            class user_view extends Backbone.View
                initialize: () ->
                    console.log('another view started...');
            userView = new user_view
