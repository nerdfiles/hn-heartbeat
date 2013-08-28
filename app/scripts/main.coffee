require.config

    ## deps: ["main"]
    enforceDefine: true

    paths:
      jquery: '../bower_components/jquery/jquery'
      text: '../bower_components/requirejs-text/text'
      underscore: '../bower_components/underscore-amd/underscore'
      backbone: '../bower_components/backbone-amd/backbone'
      marionette: '../bower_components/backbone.marionette/lib/backbone.marionette'
      html: '../bower_components/HTML/dist/HTML'
      bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min'
      d3: '../bower_components/d3/d3.min'
      rickshaw: '../bower_components/rickshaw/rickshaw.min'

    shim:
      underscore:
        exports: '_'

      backbone:
        deps: [
            'underscore'
            'jquery'
        ]
        exports: 'Backbone'

      marionette:
        deps: [
          'jquery',
          'underscore',
          'backbone'
        ],
        exports: 'Marionette'

      bootstrap:
        deps: ['jquery']
        exports: 'jquery'

      d3:
        exports: 'd3'

      rickshaw:
        exports: 'Rickshaw'

      app:
        deps: [
          'backbone'
        ]


require [
    'app'
  ], (app) ->
    $ () ->
      Backbone.history.start pushState: true
