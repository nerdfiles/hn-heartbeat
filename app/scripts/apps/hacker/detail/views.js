(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'backbone', 'apps/hacker/detail/templates', 'views/_base', 'msgbus'], function(_, Backbone, Templates, AppViews, msgBus) {
    var HackerView, Layout, LookupView, _ref, _ref1, _ref2;
    return {
      HackerView: HackerView = (function(_super) {
        __extends(HackerView, _super);

        function HackerView() {
          _ref = HackerView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        HackerView.prototype.template = _.template(Templates.hackerdetail);

        return HackerView;

      })(AppViews.ItemView),
      Layout: Layout = (function(_super) {
        __extends(Layout, _super);

        function Layout() {
          _ref1 = Layout.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        Layout.prototype.template = _.template(Templates.layout);

        Layout.prototype.regions = {
          lookup: '#lookupBar'
        };

        return Layout;

      })(AppViews.Layout),
      Lookup: LookupView = (function(_super) {
        __extends(LookupView, _super);

        function LookupView() {
          _ref2 = LookupView.__super__.constructor.apply(this, arguments);
          return _ref2;
        }

        LookupView.prototype.el = '#lookupBar';

        LookupView.prototype.events = {
          'change #lookupHacker': 'lookup'
        };

        LookupView.prototype.initialize = function() {
          var _this = this;
          return msgBus.events.on('lookup:user', function(user) {
            return _this.$('#lookupHacker').val(user);
          });
        };

        LookupView.prototype.lookup = function() {
          var lookupUser;
          lookupUser = this.$('#lookupUser').val().trim();
          console.log("lookup: " + lookupUser);
          if (lookupUser.length > 0) {
            return msgBus.events.trigger('lookup:user', lookupUser);
          } else {
            return msgBus.events.trigger('lookup:noLookupUser');
          }
        };

        return LookupView;

      })(AppViews.ItemView)
    };
  });

}).call(this);
