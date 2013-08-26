(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['underscore', 'backbone', 'models/hacker'], function(_, Backbone, HackerModel) {
    var HackerCollection, hacker_collection, _ref;
    hacker_collection = (function(_super) {
      __extends(hacker_collection, _super);

      function hacker_collection() {
        _ref = hacker_collection.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      hacker_collection.prototype.model = ProjectModel;

      return hacker_collection;

    })(Backbone.Collection);
    return HackerCollection = new hacker_collection;
  });

}).call(this);
