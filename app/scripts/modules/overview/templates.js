(function() {
  define(function(require) {
    return {
      general: require("text!modules/overview/templates/general.html.tmpl"),
      user: require("text!modules/overview/templates/user.html.tmpl")
    };
  });

}).call(this);
