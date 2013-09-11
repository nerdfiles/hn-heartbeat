# Filename: entities/hacker.coffee
define [
  "backbone"
  "msgbus"
], (Backbone, msgBus) ->
  "use strict"

  class Hacker extends Backbone.Model

  class HackerCollection extends Backbone.Collection

    model: Hacker

    initialize: () ->

      msgBus.events.on 'lookup:user', (user) =>
        @lookup user

      @loading = false

      @previousLookup = null

      @create_ts = '[2013-05-01T00:00:00Z + TO + *]'

      @contextResults = 40 # Initialize view of item (submission|comment) results

    lookup: (hacker) ->

      @previousLookup = hacker

      @fetchHacker hacker, (user) =>
        if user.length < 1
          msgBus.events.trigger 'lookup:noUserFound'
        else
          @reset user

    fetchHacker: (hacker, callback) ->
      return true if @loading
      @loading = true
      msgBus.events.trigger 'lookup:start'
      query = hacker + '&filter[fields][create_ts]=' + @create_ts
      $.ajax
        url: 'http://api.thriftdb.com/api.hnsearch.com/items/_search'
        dataType: 'jsonp'
        data: "username=#{query}"
        success: (res) =>
          console.log res
          msgBus.events.trigger 'lookup:stop'
          if res.results.length is 0
            callback []
            return []
          if res.results
            lookupResults = []
            # get hacker by username
            user = new Hacker
              username: hacker

            # items
            _.each res.results, (item) ->
              # console.log item
              # Model
              # lookupResults[lookupResults.length] = new Item
              #   title: title
              #   karma: karma
              #   date: date
            callback lookupResults
            @loading = false
            lookupResults
          else
            msgBus.events.trigger 'lookup:error'
            @loading = false
        error: () =>
          msgBus.events.trigger 'lookup:error'
          @loading = false

  # Specify frontend data API service handlersck
  msgBus.reqres.setHandler 'hacker:entities', () ->
    API.getHackerEntities()

  # Declare frontend data API service for calls from the internal app
  API =
    getHackerEntities: () ->
      hackers = new HackerCollection
