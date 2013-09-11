(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["backbone", "msgbus"], function(Backbone, msgBus) {
    "use strict";
    var API, Hacker, HackerCollection, _ref, _ref1;
    Hacker = (function(_super) {
      __extends(Hacker, _super);

      function Hacker() {
        _ref = Hacker.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return Hacker;

    })(Backbone.Model);
    HackerCollection = (function(_super) {
      __extends(HackerCollection, _super);

      function HackerCollection() {
        _ref1 = HackerCollection.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      HackerCollection.prototype.model = Hacker;

      HackerCollection.prototype.initialize = function() {
        var _this = this;
        msgBus.events.on('lookup:user', function(user) {
          return _this.lookup(user);
        });
        this.loading = false;
        this.previousLookup = null;
        this.create_ts = '[2013-05-01T00:00:00Z + TO + *]';
        return this.contextResults = 40;
      };

      HackerCollection.prototype.lookup = function(username) {
        var _this = this;
        this.previousLookup = username;
        return this.fetchUser(username, function(user) {
          console.log(user);
          if (user.length < 1) {
            return msgBus.events.trigger('lookup:noUsername');
          } else {
            return _this.reset(user);
          }
        });
      };

      HackerCollection.prototype.fetchUser = function(username, callback) {
        var query;
        if (this.loading) {
          return true;
        }
        this.loading = true;
        msgBus.events.trigger('lookup:start');
        query = "username=" + username + "&filter[fields][create_ts]=" + this.create_ts;
        return console.log(query);
      };

      return HackerCollection;

    })(Backbone.Collection);
    msgBus.reqres.setHandler('hacker:entities', function() {
      return API.getUserEntities();
    });
    return API = {
      getUserEntities: function() {
        var hackers;
        return hackers = new HackerCollection;
      }
    };
  });

}).call(this);
