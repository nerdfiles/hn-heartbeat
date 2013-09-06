(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['backbone', 'apps/hacker/show/controller', 'msgbus'], function(Backbone, Controller, msgBus) {
    var API, Router, _ref;
    Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        _ref = Router.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Router.prototype.appRoutes = {
        "hackerapp": "start"
      };

      return Router;

    })(Backbone.Marionette.AppRouter);
    msgBus.commands.setHandler("hacker:route", function() {
      return new Router({
        controller: API
      });
    });
    return API = {
      start: function() {
        return Controller.hackerApp();
      }
    };
  });

}).call(this);
