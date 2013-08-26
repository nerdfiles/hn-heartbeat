(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'backbone'], function(_, Backbone) {
    var hackerModel, hacker_model, _ref;
    hacker_model = (function(_super) {
      __extends(hacker_model, _super);

      function hacker_model() {
        _ref = hacker_model.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      hacker_model.prototype.defaults = {
        username: "None"
      };

      hacker_model.prototype.url = function() {
        return '/api/hacker/';
      };

      hacker_model.prototype.initialize = function() {
        return this.bind('change', this.update);
      };

      hacker_model.prototype.update = function() {
        return console.log(this);
      };

      return hacker_model;

    })(Backbone.Model);
    return hackerModel = new hacker_model;
  });

}).call(this);
