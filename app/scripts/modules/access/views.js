(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["modules/access/templates", "views/_base", "msgbus"], function(Templates, AppViews, msgBus) {
    "use strict";
    var Layout, View, _ref, _ref1;
    return {
      AccessLayout: Layout = (function(_super) {
        __extends(Layout, _super);

        function Layout() {
          _ref = Layout.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        Layout.prototype.template = _.template(Templates.layout);

        Layout.prototype.regions = {
          layout: ".access"
        };

        return Layout;

      })(AppViews.Layout),
      Access: View = (function(_super) {
        __extends(View, _super);

        function View() {
          _ref1 = View.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        View.prototype.template = _.template(Templates.access);

        View.prototype.events = {
          'click .menu': 'conceal'
        };

        View.prototype.initialize = function() {
          var _this = this;
          return msgBus.events.on('access:conceal', function() {
            return _this.$('.menu').hide();
          });
        };

        View.prototype.conceal = function() {
          return msgBus.events.trigger('access:conceal');
        };

        return View;

      })(AppViews.ItemView)
    };
  });

}).call(this);
