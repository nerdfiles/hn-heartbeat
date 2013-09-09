(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["apps/hacker/templates", "views/_base", "msgbus"], function(Templates, AppViews, msgBus) {
    "use strict";
    var View, _ref, _ref1;
    return {
      Lookup: View = (function(_super) {
        __extends(View, _super);

        function View() {
          _ref = View.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        View.prototype.el = "#lookup";

        View.prototype.events = {
          "change #lookupUser": "lookup"
        };

        View.prototype.initialize = function() {
          var _this = this;
          return msgBus.events.on("lookup:user", function(user) {
            return _this.$("#lookupUser").val(user);
          });
        };

        View.prototype.lookup = function() {
          var username;
          username = this.$("#lookupUser").val().trim();
          if (username.length > 0) {
            return msgBus.events.trigger("lookup:user", username);
          } else {
            return msgBus.events.trigger("lookup:noUsername");
          }
        };

        return View;

      })(AppViews.ItemView),
      Hacker: View = (function(_super) {
        __extends(View, _super);

        function View() {
          _ref1 = View.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        View.prototype.template = _.template(Templates["hacker.view"]);

        View.prototype.ui = {
          graph: "#graph"
        };

        View.prototype.onBeforeRender = function() {};

        View.prototype.onRender = function() {};

        View.prototype.className = "m--hacker";

        return View;

      })(AppViews.ItemView)
    };
  });

}).call(this);
