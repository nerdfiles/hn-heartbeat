(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["modules/login/templates", "views/_base", "msgBus"], function(Templates, AppViews, msgBus) {
    "use strict";
    var View, _ref;
    return {
      Login: View = (function(_super) {
        __extends(View, _super);

        function View() {
          _ref = View.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        View.prototype.template = _.template(Templates["login.view"]);

        View.prototype.className = "m--login";

        return View;

      })(AppViews.ItemView)
    };
  });

}).call(this);
