(function() {
  define(['require', 'text!apps/hacker/detail/templates/hackerdetail.html.tmpl'], function(require, Templates) {
    return {
      hackerdetail: require(Templates)
    };
  });

}).call(this);
