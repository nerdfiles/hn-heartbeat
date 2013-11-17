(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["d3", "rickshaw", "modules/graph/templates", "views/_base", "msgbus"], function(D3, rickshaw, Templates, AppViews, msgBus) {
    "use strict";
    var Layout, View, _ref, _ref1, _ref2, _ref3;
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
      GlobalGraph: View = (function(_super) {
        __extends(View, _super);

        function View() {
          _ref1 = View.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        View.prototype.template = _.template(Templates.graph);

        View.prototype.ui = {
          graph: "#graph"
        };

        View.prototype.className = "m--global-graph";

        View.prototype.onBeforeRender = function() {
          console.log("onBeforeRender");
          return console.log(this.ui);
        };

        View.prototype.onRender = function() {
          console.log("onRender");
          return console.log(this.ui);
        };

        return View;

      })(AppViews.ItemView),
      UserGraph: View = (function(_super) {
        __extends(View, _super);

        function View() {
          _ref2 = View.__super__.constructor.apply(this, arguments);
          return _ref2;
        }

        View.prototype.template = _.template(Templates.graph);

        View.prototype.ui = {
          graph: "#graph"
        };

        View.prototype.className = "m--user-graph";

        View.prototype.onBeforeRender = function() {
          console.log("onBeforeRender");
          return console.log(this.ui);
        };

        View.prototype.onRender = function() {
          console.log("onRender");
          return console.log(this.ui);
        };

        return View;

      })(AppViews.ItemView),
      Layout: Layout = (function(_super) {
        __extends(Layout, _super);

        function Layout() {
          _ref3 = Layout.__super__.constructor.apply(this, arguments);
          return _ref3;
        }

        Layout.prototype.template = _.template(Templates.layout);

        Layout.prototype.regions = {
          lookup: ".r--lookup",
          global: ".r--graph"
        };

        return Layout;

      })(AppViews.Layout)
    };
  });

}).call(this);
