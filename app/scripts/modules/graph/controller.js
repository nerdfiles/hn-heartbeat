(function() {
  define(["msgbus", "modules/graph/views", "modules/access/views"], function(msgBus, Views, CommonViews) {
    "use strict";
    return {
      showGraph: function(hacker) {
        var _this = this;
        this.layout = this.getLayout();
        this.accessLayout = this.getAccessLayout();
        this.layout.on("show", function() {
          _this.showLookupView();
          return _this.showGlobalGraphView();
        });
        this.accessLayout.on("show", function() {
          return _this.showAccessView();
        });
        msgBus.events.trigger("app:show", this.layout);
        return msgBus.events.trigger("app:show:access", this.accessLayout);
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
            y: 57
          }, {
            x: 3,
            y: 17
          }, {
            x: 4,
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
      showUserGraph: function(hacker) {
        var _this = this;
        this.layout = this.getLayout();
        this.accessLayout = this.getAccessLayout();
        this.layout.on("show", function() {
          _this.showLookupView();
          return _this.showUserGraphView(hacker);
        });
        this.accessLayout.on("show", function() {
          return _this.showAccessView();
        });
        msgBus.events.trigger("app:show", this.layout);
        return msgBus.events.trigger("app:show:access", this.accessLayout);
      },
      showUserGraphView: function(hacker) {
        var data, view, __json;
        view = this.getUserGraphView(hacker);
        __json = {
          JSON_from_where: {
            json__: {}
          }
        };
        __json.JSON_from_where.json__ = (data = [
          {
            x: 0,
            y: 50
          }, {
            x: 1,
            y: 59
          }, {
            x: 2,
            y: 57
          }, {
            x: 3,
            y: 17
          }, {
            x: 4,
            y: 42
          }
        ])[0];
        this.graph = new Rickshaw.Graph({
          element: document.querySelector("#graph"),
          width: 580,
          height: 250,
          series: [
            {
              color: "lightblue",
              data: data
            }
          ]
        });
        return this.graph.render();
      },
      getUserGraphView: function(hacker) {
        return new Views.UserGraph({
          model: hacker
        });
      },
      showAccessView: function() {
        var accessView;
        accessView = this.getAccessView();
        return this.accessLayout.layout.show(accessView);
      },
      getAccessView: function() {
        return new CommonViews.Access;
      },
      getAccessLayout: function() {
        return new CommonViews.AccessLayout;
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
