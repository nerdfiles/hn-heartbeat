(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "underscore", "backbone", "html", "text!../../../templates/views/home.tmpl.html", "bootstrap"], function($, _, Backbone, HTML, HomeViewTemplate) {
    var homeView, home_view, _ref;
    home_view = (function(_super) {
      __extends(home_view, _super);

      function home_view() {
        _ref = home_view.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      home_view.prototype.el = $('.app');

      home_view.prototype.render = function() {
        var compiledTmpl, data;
        data = {
          msg: "I am a cat!"
        };
        compiledTmpl = _.template($(HomeViewTemplate).html(), data);
        console.log(compiledTmpl);
        return this.$el.append(compiledTmpl);
      };

      home_view.prototype.initialize = function() {
        return this.render();
      };

      return home_view;

    })(Backbone.View);
    return homeView = new home_view;
  });

}).call(this);
