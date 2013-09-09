(function() {
  define(function(require) {
    return {
      general: require("text!apps/overview/templates/general.html.tmpl"),
      user: require("text!apps/overview/templates/user.html.tmpl")
    };
  });

}).call(this);
