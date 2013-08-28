# Filename: models/hacker.coffee
define [
  'underscore',
  'backbone'
], (_, Backbone) ->
  class HackerModel extends Backbone.Model
    defaults:
      username: "None"

    urlRoot: () ->
      '/api/hacker'

    initialize: () ->
      @bind 'change', @update

    update: () ->
      console.log @
