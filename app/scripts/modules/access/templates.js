(function() {
  define(function(require) {
    return {
      "access": require("text!modules/access/templates/access.html.tmpl"),
      "layout": require("text!modules/access/templates/layout.html.tmpl")
    };
  });

}).call(this);
