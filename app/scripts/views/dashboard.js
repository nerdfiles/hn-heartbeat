(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "underscore", "backbone", "rickshaw"], function($, _, Backbone, Rickshaw) {
    var dashboardView, dashboard_view, _ref;
    dashboard_view = (function(_super) {
      __extends(dashboard_view, _super);

      function dashboard_view() {
        _ref = dashboard_view.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      dashboard_view.prototype.initialize = function() {
        return console.log('another view started...');
      };

      return dashboard_view;

    })(Backbone.View);
    return dashboardView = new dashboard_view;
  });

}).call(this);
