(function() {
  define(['msgbus', 'apps/hacker/detail/views'], function(msgBus, Views) {
    'use strict';
    return {
      showHacker: function(user) {
        var _this = this;
        this.layout = this.getLayout();
        this.layout.on('show', function() {
          _this.showLookupBar();
          return _this.showHackerDetail();
        });
        msgBus.events.trigger('app:show', this.layout);
        return {
          showHackerDetail: function(user) {
            var view;
            console.log('controller :: showHackerDetail');
            view = this.getDetailView(user);
            return msgBus.events.trigger('app:show:hacker', view);
          },
          getDetailView: function(user) {
            return new Views.HackerView({
              model: user
            });
          },
          showLookupBar: function() {
            var lookupView;
            lookupView = this.getLookupView();
            return this.layout.lookup.attachView(lookupView);
          },
          getLookupView: function() {
            return new Views.Lookup;
          },
          getLayout: function() {
            return new Views.Layout;
          }
        };
      }
    };
  });

}).call(this);
