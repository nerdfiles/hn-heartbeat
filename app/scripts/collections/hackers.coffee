# Filename: collections/projects
define [
  'underscore',
  'backbone',
  'models/hacker'
], (_, Backbone, HackerModel) ->

  class hacker_collection extends Backbone.Collection
    model: ProjectModel

  HackerCollection = new hacker_collection
