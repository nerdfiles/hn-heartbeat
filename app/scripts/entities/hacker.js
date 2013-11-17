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

      HackerCollection.prototype.fetchUser = function(username, callback) {
        var more_query, query,
          _this = this;
        if (this.loading) {
          return true;
        }
        this.loading = true;
        msgBus.events.trigger('lookup:start');
        more_query = "&weights[title]=1.1&weights[text]=0.7&weights[domain]=2.0&weights[username]=0.1&weights[type]=0.0&boosts[fields][points]=0.15&boosts[fields][num_comments]=0.15&boosts[functions][pow(2,div(div(ms(create_ts,NOW),3600000),72))]=200.0";
        query = "q=" + username + more_query + "&filter[fields][create_ts]=" + this.create_ts;
        return $.ajax({
          url: 'http://api.thriftdb.com/api.hnsearch.com/items/_search',
          dataType: 'jsonp',
          data: "" + query,
          success: function(res) {
            var lookupResults, user;
            msgBus.events.trigger('lookup:stop');
            if (res.results.length === 0) {
              callback([]);
              return [];
            }
            console.log(res.results);
            if (res.results.length) {
              lookupResults = [];
              user = new Hacker({
                username: username,
                items: res.results
              });
            }
            return console.log(user);
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
