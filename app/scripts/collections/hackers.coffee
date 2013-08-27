# Filename: collections/projects
define [
  'underscore',
  'backbone',
  'models/hacker'
], (_, Backbone, HackerModel) ->

  class HackersCollection extends Backbone.Collection

    model: HackerModel

    url: () ->
      '/api/hacker/'
