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
        var data, view, __json;
        view = this.getGlobalGraphView();
        this.layout.global.show(view);
        __json = {
          JSON_from_where: {
            json__: {}
          }
        };
        __json.JSON_from_where.json__ = (data = [
          {
            x: 0,
            y: 40
          }, {
            x: 1,
            y: 49
          }, {
            x: 2,
            y: 17
          }, {
            x: 3,
            y: 42
          }
        ])[0];
        this.graph = new Rickshaw.Graph({
          element: document.querySelector("#graph"),
          width: 580,
          height: 250,
          series: [
            {
              color: "steelblue",
              data: data
            }
          ]
        });
        return this.graph.render();
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
