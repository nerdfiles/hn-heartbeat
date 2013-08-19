require.config

    ## deps: ["main"]

    paths:
            jquery: '../bower_components/jquery/jquery'
            underscore: '../bower_components/underscore-amd/underscore'
            backbone: '../bower_components/backbone-amd/backbone'
            html: '../bower_components/HTML/dist/HTML'
            bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min'

    shim:
            underscore:
                    exports: '_'

            backbone:
                    deps: [
                        'underscore'
                        'jquery'
                    ]
                    exports: 'Backbone'

            bootstrap:
                    deps: ['jquery']
                    exports: 'jquery'


require [
        'app'
    ], (app) ->
        $ ->
            Backbone.history.start pushState: true
