(function() {
  define(function(require) {
    return {
      "graph": require("text!apps/graph/templates/graph.html.tmpl"),
      "layout": require("text!apps/graph/templates/layout.html.tmpl")
    };
  });

}).call(this);
