(function() {
  define(["d3", "rickshaw", "apps/graph/views", "msgbus"], function(D3, rickshaw, Views, msgBus) {
    "use strict";
    return {
      showGraph: function(hacker) {
        var _this = this;
        this.layout = this.getLayout;
        this.layout.on("show", function() {
          return _this.showLookupView();
        });
        return msgBus.events.trigger("app:show", this.layout);
      },
      showGraphDetail: function(hacker) {
        var view;
        view = this.getDetailView(hacker);
        return msgBus.events.trigger("app:show", view);
      },
      getDetailView: function(hacker) {
        return new Views.Graph({
          model: hacker
        });
      },
      showLookupView: function() {
        var lookupView;
        lookupView = this.getLookupView;
        return this.layout.lookup.attachView(lookupView);
      },
      getLookupView: function() {
        return new Views.Lookup;
      },
      getLayout: function() {
        return new Views.Layout;
      },
      "app.overview": function() {
        return console.log("overview");
      },
      "app.graph": function() {
        var data, view, __json;
        view = new Views.Graph;
        msgBus.events.trigger("app:show", view);
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
      }
    };
  });

}).call(this);
