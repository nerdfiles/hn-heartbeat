# Filename: modules/overview/views.coffee
define [
  "backbone"
  "modules/overview/templates"
  "views/_base"
  "msgbus"
], (Backbone, Templates, AppView, msgBus) ->

  GeneralOverviewView: class GeneralOverviewView extends AppView.ItemView
    template: _.template Templates.general

  UserOverviewView: class UserOverviewView extends App.View.ItemView
    template: _.template Templates.user
