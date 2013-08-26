(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "underscore", "backbone", "html", "collections/hackers", "text!../../../templates/views/home.tmpl.html", "bootstrap"], function($, _, Backbone, HTML, HackersCollection, HomeViewTemplate) {
    var homeView, home_view, _ref;
    home_view = (function(_super) {
      __extends(home_view, _super);

      function home_view() {
        _ref = home_view.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      home_view.prototype.el = $('.app');

      home_view.prototype.events = function() {
        return {
          "blur input#__username__": "__save__"
        };
      };

      home_view.prototype.__save__ = function(e) {
        console.log(this.$el);
        this.collection = new HackersCollection;
        return this.collection.add({
          username: 'wittysense'
        });
      };

      home_view.prototype.render = function() {
        var compiledTmpl, data;
        data = {
          hackers: this.collection.models
        };
        compiledTmpl = _.template($(HomeViewTemplate).html(), data);
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
