# Filename: modules/login/views.coffee
define [
  "modules/login/templates"
  "views/_base"
  "msgBus"
], (Templates, AppViews, msgBus) ->
  "use strict"

  Login: class View extends AppViews.ItemView
    template: _.template Templates["login.view"]
    className: "m--login"
