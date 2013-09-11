(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["marionette", "apps/graph/controller", "msgbus", "entities/hacker"], function(Marionette, Controller, msgBus) {
    "use strict";
    var API, Router, hacker, _ref;
    msgBus.events.on("lookup:user", function(user) {
      return Backbone.history.navigate("lookup/" + user);
    });
    hacker = msgBus.reqres.request = "hacker:entities";
    Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        _ref = Router.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Router.prototype.appRoutes = {
        "": "overview",
        "lookup/:username": "lookup"
      };

      return Router;

    })(Backbone.Marionette.AppRouter);
    msgBus.events.on("lookup:hacker", function(hacker) {
      return API.showUserGraph(hacker);
    });
    msgBus.commands.setHandler("graph:route", function() {
      return new Router({
        controller: API
      });
    });
    return API = {
      overview: function() {
        console.log('overview');
        return Controller.showGraph();
      },
      lookup: function(username) {
        return msgBus.events.trigger("lookup:user", username);
      },
      showUserGraph: function(hacker) {
        return Controller.showUserGraphView(hacker);
      }
    };
  });

}).call(this);
