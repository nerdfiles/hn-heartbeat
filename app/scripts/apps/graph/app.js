(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["backbone", "apps/graph/controller", "msgbus", "entities/hacker"], function(Backbone, Controller, msgBus) {
    "use strict";
    var API, Router, user, _ref;
    msgBus.events.on("lookup:user", function(user) {
      return Backbone.history.navigate("lookup/" + user);
    });
    user = msgBus.reqres.request = "hacker:entities";
    Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        _ref = Router.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Router.prototype.appRoutes = {
        "": "overview",
        "graph": "graph",
        "lookup/:username": "lookup"
      };

      return Router;

    })(Backbone.Marionette.AppRouter);
    msgBus.commands.setHandler("graph:route", function() {
      return new Router({
        controller: API
      });
    });
    return API = {
      overview: function() {
        return Controller["app.overview"]();
      },
      lookup: function(username) {
        return msgBus.events.trigger("lookup:user", username);
      },
      graph: function() {
        return Controller["app.graph"]();
      }
    };
  });

}).call(this);
