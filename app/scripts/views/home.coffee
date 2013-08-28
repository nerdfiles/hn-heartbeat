# Filename: views/home.coffee
define [
    "jquery"
    "underscore"
    "backbone"
    "html"
    "collections/hackers"
    "text!../../../templates/views/home.tmpl.html"
    "bootstrap"
  ],
  ($,_,Backbone,HTML,HackersCollection,HomeViewTemplate) ->
    class home_view extends Backbone.View

      el: $ '.app'

      events: () ->
        "blur input#__username__": "__login__"

      __login__: (e) ->

        __username__ = @$el.find('#__username__').val()

        @collection.reset({
        	username: __username__
        })
        
        @collection.fetch({
          success: (response, data) ->
            console.log @
          error: (model, xhr, options) ->
            console.log @
        })
        
      render: () ->
        data =
          hackers: @collection.models

        # console.log data
        compiledTmpl = _.template $(HomeViewTemplate).html(), data

        @$el.append compiledTmpl

      initialize: () ->

        # Make GET request here to internal API
        # at /api/hacker/ which should return JSON
        # for the desired hacker from hacker news.
        # 
        # nerdfiles, sd:25 08 2013.19.39.51
        
        # Mock some data here
        @collection = new HackersCollection
        
        @render()

    homeView = new home_view
