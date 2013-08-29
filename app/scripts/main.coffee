require.config

    # enforceDefine: true

    paths:
      jquery: '../bower_components/jquery/jquery'
      text: '../bower_components/requirejs-text/text'
      underscore: '../bower_components/backbone.marionette/public/javascripts/underscore'
      backbone: '../bower_components/backbone-amd/backbone'
      'backbone.wreqr': '../bower_components/backbone.wreqr/lib/amd/backbone.wreqr'
      'backbone.eventbinder': '../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder'
      'backbone.babysitter': '../bower_components/backbone.babysitter/lib/amd/backbone.babysitter'
      marionette: '../bower_components/backbone.marionette/lib/core/amd/backbone.marionette'
      html: '../bower_components/HTML/dist/HTML'
      bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min'
      d3: '../bower_components/d3/d3.min'
      rickshaw: '../bower_components/rickshaw/rickshaw.min'

    shim:
      underscore:
        deps: ['text']
        exports: '_'

      backbone:
        deps: [
          'underscore'
          'jquery'
        ]
        exports: 'Backbone'

      marionette:
        deps: ['backbone']
        exports: 'Marionette'

      bootstrap:
        deps: ['jquery']
        exports: 'jquery'

      d3:
        exports: 'd3'

      rickshaw:
        exports: 'Rickshaw'

      common:
        deps: ['marionette']


require [
	'config/_base'
	'app'
	'apps/hacker/app'
], (_config, HNHeartbeat) ->
	'use strict'
	HNHeartbeat.start()
