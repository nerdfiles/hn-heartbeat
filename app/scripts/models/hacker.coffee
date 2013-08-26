# Filename: models/hacker.coffee
define [
  'underscore',
  'backbone'
], (_, Backbone) ->
  class hacker_model extends Backbone.Model
    defaults: {
      name: "Harry Potter"
    }

  hackerModel = new hacker_model
