(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['msgbus', 'marionette', 'apps/hacker/detail/controller'], function(msgBus, Marionette, Controller) {
    'use strict';
    var Router, _ref;
    return Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        _ref = Router.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Router.prototype.appRoutes = {
        "": "defaultLookup",
        "lookup/:user": "lookup"
      };

      return Router;

    })(Marionette.AppRouter);
  });

}).call(this);
