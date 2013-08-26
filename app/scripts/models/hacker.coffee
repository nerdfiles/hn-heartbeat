# Filename: models/hacker.coffee
define [
  'underscore',
  'backbone'
], (_, Backbone) ->
  class hacker_model extends Backbone.Model
    defaults:
      username: "None"

  hackerModel = new hacker_model
