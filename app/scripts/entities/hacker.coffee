# Filename: entities/hacker.coffee
define [
  "backbone"
  "msgbus"
  "Q"
], (Backbone, msgBus, Q) ->
  "use strict"

  class Hacker extends Backbone.Model
    initialize: (x) ->
      @username = x.username
    url: () ->
      # if not saved to server
      url = if not @isNew() then '/api/hacker/' else '/api/hacker/' + @username + '/'

  class HackerCollection extends Backbone.Collection

    model: Hacker

    initialize: () ->
      msgBus.events.on 'lookup:user', (username) =>
        @lookup username
      @loading = false
      @previousLookup = null
      @create_ts = '[2013-05-01T00:00:00Z+TO+*]'
      @contextResults = 40 # Initialize view of item (submission|comment) results

    reset: (username) =>
      console.log @

    lookup: (username) ->
      @previousLookup = username
      @fetchUser username, (user) =>
        if user.length < 1
          msgBus.events.trigger 'lookup:noUsername'
        else
          @reset user

    createUser: (hckr) ->

      return true if @loading

      @loading = true
      # http://api.thriftdb.com/api.hnsearch.com/items/_search?q=thenerdfiles&weights[title]=1.1&weights[text]=0.7&weights[domain]=2.0&weights[username]=0.1&weights[type]=0.0&boosts[fields][points]=0.15&boosts[fields][num_comments]=0.15&boosts[functions][pow(2,div(div(ms(create_ts,NOW),3600000),72))]=200.0&pretty_print=true
      # http://api.thriftdb.com/api.hnsearch.com/items/_search?pretty_print=true&q=thenerdfiles&weights[title]=1.1&weights[text]=0.7&weights[domain]=2.0&weights[username]=0.1&weights[type]=0.0&boosts[fields][points]=0.15&boosts[fields][num_comments]=0.15&boosts[functions][pow(2,div(div(ms(create_ts,NOW),3600000),72))]=200.0&filter[fields][create_ts]=[2013-05-01T00:00:00Z + TO + *]
      # more_query = "&weights[title]=1.1&weights[text]=0.7&weights[domain]=2.0&weights[username]=0.1&weights[type]=0.0&boosts[fields][points]=0.15&boosts[fields][num_comments]=0.15&boosts[functions][pow(2,div(div(ms(create_ts,NOW),3600000),72))]=200.0"
      # query = "q=" + username + more_query + "&filter[fields][create_ts]=" + @create_ts

      msgBus.events.trigger 'create:start'

      api_data =
        heartbeat:
          items: [
            {"item_date": "2013-11-24T05:08:12Z", "item_title": "disagreeing post", "item_type": "post", "item_karma": 25},
            {"item_date": "2013-11-24T05:08:12Z", "item_title": "disagreeing post", "item_type": "post", "item_karma": 25},
            {"item_date": "2013-11-24T05:08:12Z", "item_title": "disagreeing post", "item_type": "post", "item_karma": 25}
          ]

      hckr.save api_data,
        success: (model, response, options) ->
          console.log "create", response
        error: (model, xhr, options) ->
          console.log "create:error", xhr

    fetchUser: (username, callback) ->

      return true if @loading
      # No id attribute
      msgBus.events.trigger 'lookup:start'

      hckr = new Hacker
        username: username

      hckr.fetch
        success: (model, response, options) =>
          console.log 'grabbed', username
          @loading = false

        error: (model, xhr, options) =>
          statusText = xhr.statusText
          @loading = false
          @reset username
          if statusText == 'NOT FOUND'
            @createUser hckr

  # Specify frontend data API service handlersck
  msgBus.reqres.setHandler 'hacker:entities', () ->
    API.getUserEntities()

  # Declare frontend data API service for calls from the internal app
  API =
    getUserEntities: () ->
      hackers = new HackerCollection
