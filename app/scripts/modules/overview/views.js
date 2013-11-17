(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["backbone", "modules/overview/templates", "views/_base", "msgbus"], function(Backbone, Templates, AppView, msgBus) {
    var GeneralOverviewView, UserOverviewView, _ref, _ref1;
    return {
      GeneralOverviewView: GeneralOverviewView = (function(_super) {
        __extends(GeneralOverviewView, _super);

        function GeneralOverviewView() {
          _ref = GeneralOverviewView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        GeneralOverviewView.prototype.template = _.template(Templates.general);

        return GeneralOverviewView;

      })(AppView.ItemView),
      UserOverviewView: UserOverviewView = (function(_super) {
        __extends(UserOverviewView, _super);

        function UserOverviewView() {
          _ref1 = UserOverviewView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        UserOverviewView.prototype.template = _.template(Templates.user);

        return UserOverviewView;

      })(App.View.ItemView)
    };
  });

}).call(this);
