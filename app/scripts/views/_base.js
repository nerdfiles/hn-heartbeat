(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(['marionette'], function(Marionette) {
    var AppCollectionView, AppCompositeView, AppItemView, AppLayout, _ref, _ref1, _ref2, _ref3;
    return {
      ItemView: AppItemView = (function(_super) {
        __extends(AppItemView, _super);

        function AppItemView() {
          _ref = AppItemView.__super__.constructor.apply(this, arguments);
          return _ref;
        }

        return AppItemView;

      })(Marionette.ItemView),
      CollectionView: AppCollectionView = (function(_super) {
        __extends(AppCollectionView, _super);

        function AppCollectionView() {
          _ref1 = AppCollectionView.__super__.constructor.apply(this, arguments);
          return _ref1;
        }

        return AppCollectionView;

      })(Marionette.CollectionView),
      CompositeView: AppCompositeView = (function(_super) {
        __extends(AppCompositeView, _super);

        function AppCompositeView() {
          _ref2 = AppCompositeView.__super__.constructor.apply(this, arguments);
          return _ref2;
        }

        return AppCompositeView;

      })(Marionette.CompositeView),
      Layout: AppLayout = (function(_super) {
        __extends(AppLayout, _super);

        function AppLayout() {
          _ref3 = AppLayout.__super__.constructor.apply(this, arguments);
          return _ref3;
        }

        return AppLayout;

      })(Marionette.Layout)
    };
  });

}).call(this);
