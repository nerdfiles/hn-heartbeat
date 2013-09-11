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

      HackerCollection.prototype.lookup = function(hacker) {
        var _this = this;
        this.previousLookup = hacker;
        return this.fetchHacker(hacker, function(user) {
          if (user.length < 1) {
            return msgBus.events.trigger('lookup:noUserFound');
          } else {
            return _this.reset(user);
          }
        });
      };

      HackerCollection.prototype.fetchHacker = function(hacker, callback) {
        var query,
          _this = this;
        if (this.loading) {
          return true;
        }
        this.loading = true;
        msgBus.events.trigger('lookup:start');
        query = hacker + '&filter[fields][create_ts]=' + this.create_ts;
        return $.ajax({
          url: 'http://api.thriftdb.com/api.hnsearch.com/items/_search',
          dataType: 'jsonp',
          data: "username=" + query,
          success: function(res) {
            var lookupResults, user;
            console.log(res);
            msgBus.events.trigger('lookup:stop');
            if (res.results.length === 0) {
              callback([]);
              return [];
            }
            if (res.results) {
              lookupResults = [];
              user = new Hacker({
                username: hacker
              });
              _.each(res.results, function(item) {});
              callback(lookupResults);
              _this.loading = false;
              return lookupResults;
            } else {
              msgBus.events.trigger('lookup:error');
              return _this.loading = false;
            }
          },
          error: function() {
            msgBus.events.trigger('lookup:error');
            return _this.loading = false;
          }
        });
      };

      return HackerCollection;

    })(Backbone.Collection);
    msgBus.reqres.setHandler('hacker:entities', function() {
      return API.getHackerEntities();
    });
    return API = {
      getHackerEntities: function() {
        var hackers;
        return hackers = new HackerCollection;
      }
    };
  });

}).call(this);
