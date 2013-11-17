(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["marionette", "modules/graph/controller", "msgbus", "entities/hacker"], function(Marionette, Controller, msgBus) {
    "use strict";
    var API, Router, hacker, _ref;
    msgBus.events.on("lookup:user", function(user) {
      return Backbone.history.navigate("lookup/" + user);
    });
    hacker = msgBus.reqres.request("hacker:entities");
    Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        _ref = Router.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Router.prototype.appRoutes = {
        "": "graphOverview",
        "lookup/:username": "graphUser"
      };

      return Router;

    })(Backbone.Marionette.AppRouter);
    msgBus.commands.setHandler("graph:route", function() {
      return new Router({
        controller: API
      });
    });
    return API = {
      graphOverview: function() {
        return Controller.showGraph();
      },
      graphUser: function(hacker) {
        Controller.showUserGraph(hacker);
        return msgBus.events.trigger("lookup:user", hacker);
      }
    };
  });

}).call(this);
