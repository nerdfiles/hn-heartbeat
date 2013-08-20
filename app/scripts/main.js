(function() {
  require.config({
    paths: {
      jquery: '../bower_components/jquery/jquery',
      underscore: '../bower_components/underscore-amd/underscore',
      backbone: '../bower_components/backbone-amd/backbone',
      html: '../bower_components/HTML/dist/HTML',
      bootstrap: '../bower_components/bootstrap/dist/js/bootstrap.min',
      d3: '../bower_components/d3/d3.min',
      rickshaw: '../bower_components/rickshaw/tutorial'
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
      }
    }
  });

  require(['app'], function(app) {
    return $(function() {
      return Backbone.history.start({
        pushState: true
      });
    });
  });

}).call(this);
