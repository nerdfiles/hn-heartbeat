# Filename: main.coffee
require.config

    enforceDefine: true

    paths:
      jquery: "../bower_components/jquery/jquery"
      underscore: "../bower_components/underscore-amd/underscore"
      backbone: "../bower_components/backbone-amd/backbone"
      "backbone.wreqr": "../bower_components/backbone.wreqr/lib/amd/backbone.wreqr"
      "backbone.eventbinder": "../bower_components/backbone.eventbinder/lib/amd/backbone.eventbinder"
      "backbone.babysitter": "../bower_components/backbone.babysitter/lib/amd/backbone.babysitter"
      marionette: "../bower_components/backbone.marionette/lib/core/amd/backbone.marionette"
      text: "../bower_components/requirejs-text/text"
      html: "../bower_components/HTML/dist/HTML"
      "response.js": "../bower_components/responsejs/response.min"
      bootstrap: "../bower_components/bootstrap/dist/js/bootstrap.min"
      d3: "../bower_components/d3/d3.min"
      rickshaw: "../bower_components/rickshaw/rickshaw"
      "Q": "//cdnjs.cloudflare.com/ajax/libs/q.js/0.9.6/q.min"

    shim:
      underscore:
        exports: "_"
      d3:
        exports: "d3"
      rickshaw:
        deps: ["d3"]
        exports: "Rickshaw"

require [
  "config/_base"
  "app"
  "modules/graph/module"
], (_config, HNHeartbeat) ->

  "use strict"

  HNHeartbeat.start()
