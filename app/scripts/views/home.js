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
          "blur input#__username__": "__load__"
        };
      };

      home_view.prototype.__load__ = function(e) {
        var __username__;
        __username__ = this.$el.find('#__username__').val();
        this.collection.reset({
          username: __username__
        });
        return this.collection.fetch({
          success: function(response, data) {
            return console.log(this);
          },
          error: function(model, xhr, options) {
            return console.log(this);
          }
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
        this.collection = new HackersCollection;
        return this.render();
      };

      return home_view;

    })(Backbone.View);
    return homeView = new home_view;
  });

}).call(this);
