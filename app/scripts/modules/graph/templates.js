(function() {
  define(function(require) {
    return {
      "graph": require("text!modules/graph/templates/graph.html.tmpl"),
      "layout": require("text!modules/graph/templates/layout.html.tmpl")
    };
  });

}).call(this);
