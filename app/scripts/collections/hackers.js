(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'backbone', 'models/hacker'], function(_, Backbone, HackerModel) {
    var HackersCollection, _ref;
    return HackersCollection = (function(_super) {
      __extends(HackersCollection, _super);

      function HackersCollection() {
        _ref = HackersCollection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      HackersCollection.prototype.model = HackerModel;

      HackersCollection.prototype.url = function() {
        return '/api/hacker/';
      };

      return HackersCollection;

    })(Backbone.Collection);
  });

}).call(this);
