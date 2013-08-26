# Filename: models/hacker.coffee
define [
  'underscore',
  'backbone'
], (_, Backbone) ->
  class hacker_model extends Backbone.Model
    defaults:
      username: "None"

    url: () ->
      '/api/hacker/'

    initialize: () ->
      @bind 'change', @update

    update: () ->
      console.log @

  hackerModel = new hacker_model
