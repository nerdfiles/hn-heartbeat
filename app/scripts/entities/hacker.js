(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["backbone", "msgbus", "Q"], function(Backbone, msgBus, Q) {
    "use strict";
    var API, Hacker, HackerCollection, _ref, _ref1;
    Hacker = (function(_super) {
      __extends(Hacker, _super);

      function Hacker() {
        _ref = Hacker.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Hacker.prototype.initialize = function(x, y, z) {
        console.log(x);
        console.log(y);
        console.log(z);
        return this.username = x.username;
      };

      Hacker.prototype.url = function() {
        var url;
        return url = this.isNew() ? '/api/create/' : '/api/hacker/' + this.username;
      };

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
        msgBus.events.on('lookup:user', function(username) {
          return _this.lookup(username);
        });
        this.loading = false;
        this.previousLookup = null;
        this.create_ts = '[2013-05-01T00:00:00Z+TO+*]';
        return this.contextResults = 40;
      };

      HackerCollection.prototype.lookup = function(username) {
        var _this = this;
        this.previousLookup = username;
        return this.fetchUser(username, function(user) {
          if (user.length < 1) {
            return msgBus.events.trigger('lookup:noUsername');
          } else {
            return _this.reset(user);
          }
        });
      };

      HackerCollection.prototype.createUser = function(username, callback) {
        var data, hckr;
        if (this.loading) {
          return true;
        }
        this.loading = true;
        msgBus.events.trigger('create:start');
        data = {};
        hckr = new Hacker({
          username: username
        });
        return hckr.save(null, {
          success: function(res) {
            return console.log(res);
          },
          error: function(err) {
            return console.log(err);
          }
        });
      };

      HackerCollection.prototype.fetchUser = function(username, callback) {
        var hckr;
        if (this.loading) {
          return true;
        }
        this.loading = true;
        msgBus.events.trigger('lookup:start');
        hckr = new Hacker({
          username: username
        });
        return hckr.save(null, {
          success: function(res) {
            return console.log(res);
          },
          error: function(err) {
            return console.log(err);
          }
        });
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
