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

      @create_ts = '[2013-05-01T00:00:00Z+TO+*]'

      @contextResults = 40 # Initialize view of item (submission|comment) results

    lookup: (username) ->

      @previousLookup = username

      @fetchUser username, (user) =>
        if user.length < 1
          msgBus.events.trigger 'lookup:noUsername'
        else
          @reset user

    fetchUser: (username, callback) ->
      return true if @loading
      @loading = true
      msgBus.events.trigger 'lookup:start'
      # http://api.thriftdb.com/api.hnsearch.com/items/_search?q=thenerdfiles&weights[title]=1.1&weights[text]=0.7&weights[domain]=2.0&weights[username]=0.1&weights[type]=0.0&boosts[fields][points]=0.15&boosts[fields][num_comments]=0.15&boosts[functions][pow(2,div(div(ms(create_ts,NOW),3600000),72))]=200.0&pretty_print=true
      # http://api.thriftdb.com/api.hnsearch.com/items/_search?pretty_print=true&q=thenerdfiles&weights[title]=1.1&weights[text]=0.7&weights[domain]=2.0&weights[username]=0.1&weights[type]=0.0&boosts[fields][points]=0.15&boosts[fields][num_comments]=0.15&boosts[functions][pow(2,div(div(ms(create_ts,NOW),3600000),72))]=200.0&filter[fields][create_ts]=[2013-05-01T00:00:00Z + TO + *]
      more_query = "&weights[title]=1.1&weights[text]=0.7&weights[domain]=2.0&weights[username]=0.1&weights[type]=0.0&boosts[fields][points]=0.15&boosts[fields][num_comments]=0.15&boosts[functions][pow(2,div(div(ms(create_ts,NOW),3600000),72))]=200.0"
      query = "q=" + username + more_query + "&filter[fields][create_ts]=" + @create_ts
      # Need to use Promises here
      $.ajax
        url: 'http://api.thriftdb.com/api.hnsearch.com/items/_search'
        dataType: 'jsonp'
        data: "#{query}"
        success: (res) =>
          msgBus.events.trigger 'lookup:stop'
          if res.results.length is 0
            callback []
            return []
          console.log res.results
          if res.results.length
            lookupResults = []
            user = new Hacker
              username: username
              items: res.results

          console.log user

      #       # items
      #       _.each res.results, (item) ->
      #         # console.log item
      #         # Model
      #         # lookupResults[lookupResults.length] = new Item
      #         #   title: title
      #         #   karma: karma
      #         #   date: date
      #       callback lookupResults
      #       @loading = false
      #       lookupResults
      #     else
      #       msgBus.events.trigger 'lookup:error'
      #       @loading = false
      #   error: () =>
      #     msgBus.events.trigger 'lookup:error'
      #     @loading = false

  # Specify frontend data API service handlersck
  msgBus.reqres.setHandler 'hacker:entities', () ->
    API.getUserEntities()

  # Declare frontend data API service for calls from the internal app
  API =
    getUserEntities: () ->
      hackers = new HackerCollection
