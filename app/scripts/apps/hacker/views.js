(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["apps/hacker/templates", "views/_base", "msgbus"], function(Templates, AppViews, msgBus) {
    "use strict";
    var View, _ref;
    return {
      Hacker: View = (function(_super) {
        __extends(View, _super);

        function View() {
          _ref = View.__super__.constructor.apply(this, arguments);
          return _ref;
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
