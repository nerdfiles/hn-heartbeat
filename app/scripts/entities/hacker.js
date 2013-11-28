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

      Hacker.prototype.initialize = function(model) {
        return this.username = model.username;
      };

      Hacker.prototype.url = function() {
        var url;
        this.creating = this.get('creating');
        return url = !this.isNew() || this.creating === true ? '/api/hacker/' : '/api/hacker/' + this.username + '/';
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

      HackerCollection.prototype.reset = function(username) {
        return console.log(this);
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

      HackerCollection.prototype.createUser = function(hckr) {
        var api_data;
        if (this.loading) {
          return true;
        }
        this.loading = true;
        msgBus.events.trigger('create:start');
        api_data = {
          heartbeat: {
            items: [
              {
                "item_date": "2013-11-24T05:08:12Z",
                "item_title": "disagreeing post",
                "item_type": "post",
                "item_karma": 25
              }, {
                "item_date": "2013-11-24T05:08:12Z",
                "item_title": "disagreeing post",
                "item_type": "post",
                "item_karma": 25
              }, {
                "item_date": "2013-11-24T05:08:12Z",
                "item_title": "disagreeing post",
                "item_type": "post",
                "item_karma": 25
              }
            ]
          }
        };
        return hckr.save(api_data, {
          success: function(model, response, options) {
            return console.log("create", response);
          },
          error: function(model, xhr, options) {
            return console.log("create:error", xhr);
          }
        });
      };

      HackerCollection.prototype.fetchUser = function(username, callback) {
        var hckr,
          _this = this;
        if (this.loading) {
          return true;
        }
        msgBus.events.trigger('lookup:start');
        hckr = new Hacker({
          username: username
        });
        return hckr.fetch({
          success: function(model, response, options) {
            console.log('grabbed', username);
            return _this.loading = false;
          },
          error: function(model, xhr, options) {
            var statusText;
            statusText = xhr.statusText;
            _this.loading = false;
            hckr.set({
              creating: true
            });
            if (statusText === 'NOT FOUND') {
              return _this.createUser(hckr);
            }
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
