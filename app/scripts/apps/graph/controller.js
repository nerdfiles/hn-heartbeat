(function() {
  define(["msgbus", "apps/graph/views"], function(msgBus, Views) {
    "use strict";
    return {
      showGraph: function(hackers) {
        var _this = this;
        this.layout = this.getLayout();
        this.layout.on("show", function() {
          _this.showLookupView();
          return _this.showGlobalGraphView();
        });
        return msgBus.events.trigger("app:show", this.layout);
      },
      showGlobalGraphView: function() {
        var view;
        view = this.getGlobalGraphView();
        return this.layout.global.show(view);
      },
      getGlobalGraphView: function() {
        return new Views.GlobalGraph;
      },
      showUserGraphView: function(hacker) {
        var view;
        view = this.getUserGraphView(hacker);
        return msgBus.events.trigger("app:show:graph", view);
      },
      getUserGraphView: function(hacker) {
        return new Views.UserGraph({
          model: hacker
        });
      },
      showLookupView: function() {
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
  });

}).call(this);
