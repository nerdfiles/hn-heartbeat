# Filename: entities/hacker.coffee
define [
  'backbone'
  'msgbus'
], (Backbone, msgBus) ->
  class Hacker extends Backbone.Model
  
  class HackerCollection extends Backbone.Collection

    model: Hacker

    initialize: () ->

      msgBus.events.on 'lookup:user', (user) ->
        @lookup user

      @loading = false

      @previousLookup = null

      @create_ts = encodedURIComponent '[2013-05-01T00:00:00Z + TO + *]'

      @contextResults = 40 # Initialize view of item (submission|comment) results

    lookup: (lookupUser) ->

      @previousLookup = lookupUser

      @fetchHacker lookupUser, (user) =>
        if user.length < 1
          msgBus.events.trigger 'lookup:noUserFound'
        else
          @reset user

    fetchHacker: (lookupUser, callback) ->
      return true if @loading
      @loading = true
      msgBus.events.trigger 'lookup:start'
      q = lookupUser + '&filter[fields][create_ts]=' + @create_ts
      $.ajax
        url: 'http://api.thriftdb.com/api.hnsearch.com/items/_search'
        dataType: 'jsonp'
        data: "username=#{query}"
        success: (res) =>
          msgBus.events.trigger 'lookup:stop'
          if res.results.length is 0
            callback []
            return []
          if res.results

            lookupResults = []
            
            # hacker
            hacker = new Hacker
              username: username

            # items
            _.each res.results, (item) ->
              # Model
              lookupResults[lookupResults.length] = new Item
                title: title
                karma: karma
                date: date
            callback lookupResults
            @loading = false
            lookupResults
          else
            msgBus.events.trigger 'lookup:error'
            @loading = false
        error: () =>
          msgBus.events.trigger 'lookup:error'
          @loading = false

  msgBus.reqres.setHandler 'hacker:entities', () ->
    API.getHackerEntities()

  API =
    getHackerEntities: () ->
      hackers = new HackerCollection
