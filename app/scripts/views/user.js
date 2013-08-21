(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "underscore", "backbone", "d3", "rickshaw"], function($, _, Backbone) {
    var userView, user_view, _ref;
    user_view = (function(_super) {
      __extends(user_view, _super);

      function user_view() {
        _ref = user_view.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      user_view.prototype.initialize = function() {
        return console.log('another view started...');
      };

      return user_view;

    })(Backbone.View);
    return userView = new user_view;
  });

}).call(this);
