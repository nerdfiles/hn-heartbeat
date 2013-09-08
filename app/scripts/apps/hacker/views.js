(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["d3", "rickshaw", "apps/hacker/templates", "views/_base", "msgbus"], function(D3, rickshaw, Templates, AppViews, msgBus) {
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

        View.prototype.onBeforeRender = function() {
          console.log("onBeforeRender");
          console.log(d3);
          return console.log(Rickshaw);
        };

        View.prototype.className = "m--hacker";

        return View;

      })(AppViews.ItemView)
    };
  });

}).call(this);
