(function() {
  define(function(require) {
    return {
      "graph": require("text!apps/hacker/templates/graph.html.tmpl"),
      "layout": require("text!apps/hacker/templates/layout.html.tmpl")
    };
  });

}).call(this);
