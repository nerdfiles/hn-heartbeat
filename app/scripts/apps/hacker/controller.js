(function() {
  define(["d3", "rickshaw", "apps/hacker/views", "msgbus"], function(D3, rickshaw, Views, msgBus) {
    "use strict";
    return {
      "app.hacker": function() {
        var data, elem, view, __json;
        view = new Views.Hacker;
        msgBus.events.trigger("app:show", view);
        [
          (function() {
            var _i, _len, _ref, _results;
            _ref = [1, 2, 3];
            _results = [];
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              elem = _ref[_i];
              _results.push(elem + 1);
            }
            return _results;
          })()
        ].pop();
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
        console.log(__json.JSON_from_where.json__);
        console.log([__json.JSON_from_where.json__]);
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
