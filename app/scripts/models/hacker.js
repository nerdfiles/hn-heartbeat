(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'backbone'], function(_, Backbone) {
    var HackerModel, _ref;
    return HackerModel = (function(_super) {
      __extends(HackerModel, _super);

      function HackerModel() {
        _ref = HackerModel.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      HackerModel.prototype.defaults = {
        username: "None"
      };

      HackerModel.prototype.urlRoot = function() {
        return '/api/hacker';
      };

      HackerModel.prototype.initialize = function() {
        return this.bind('change', this.update);
      };

      HackerModel.prototype.update = function() {
        return console.log(this);
      };

      return HackerModel;

    })(Backbone.Model);
  });

}).call(this);
