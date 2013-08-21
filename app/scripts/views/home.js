(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "underscore", "backbone", "html", "text!../../../templates/views/home.tmpl.haml", "bootstrap"], function($, _, Backbone, HTML, HomeViewTemplate) {
    var home_view, _ref;
    return home_view = (function(_super) {
      var homeView;

      __extends(home_view, _super);

      function home_view() {
        _ref = home_view.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      home_view.prototype.initialize = function() {
        console.log('home view');
        return console.log(HTML);
      };

      homeView = new home_view;

      return home_view;

    })(Backbone.View);
  });

}).call(this);
