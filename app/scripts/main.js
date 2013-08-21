(function() {
  require.config({
    enforceDefine: true,
    paths: {
      jquery: '../bower_components/jquery/jquery',
      text: '../bower_components/requirejs-text/text',
      underscore: '../bower_components/underscore-amd/underscore',
      backbone: '../bower_components/backbone-amd/backbone',
      html: '../bower_components/HTML/dist/HTML.min',
      bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
      d3: '../bower_components/d3/d3.min',
      rickshaw: '../bower_components/rickshaw/rickshaw.min'
    },
    shim: {
      underscore: {
        exports: '_'
      },
      backbone: {
        deps: ['underscore', 'jquery'],
        exports: 'Backbone'
      },
      bootstrap: {
        deps: ['jquery'],
        exports: 'jquery'
      },
      d3: {
        exports: 'd3'
      },
      rickshaw: {
        deps: ['d3'],
        exports: 'rickshaw'
      }
    }
  });

  require(['app'], function(app) {
    return $(function() {
      console.log(Backbone);
      return Backbone.history.start({
        pushState: true
      });
    });
  });

}).call(this);
