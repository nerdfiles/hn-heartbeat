(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['marionette', 'apps/hacker/detail/controller', 'msgbus', 'entities/hacker'], function(Marionette, Controller, msgBus) {
    var API, Router, defaultUser, user, _ref;
    msgBus.events.on('lookup:user', function(user) {
      return Backbone.history.navigate('lookup/' + user);
    });
    defaultUser = 'pg';
    user = msgBus.reqres.request('hacker:entites');
    Router = (function(_super) {
      __extends(Router, _super);

      function Router() {
        _ref = Router.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      Router.prototype.appRoutes = {
        '': 'defaultLookup',
        'lookup/:user': 'lookup'
      };

      return Router;

    })(Marionette.AppRouter);
    msgBus.commands.setHandler('hacker:route', function() {
      return new Router({
        controller: API
      });
    });
    return API = {
      lookup: function(user) {
        return msgBus.events.trigger('lookup:user', user);
      },
      defaultLookup: function() {
        return API.lookup(hacker.previousLookup || defaultUser);
      },
      showHackerDetail: function(user) {
        return Controller.showHackerDetail(user);
      }
    };
  });

}).call(this);
