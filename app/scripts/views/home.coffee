define [
    "jquery"
    "underscore"
    "backbone"
    "html"
    "text!../../../templates/views/home.tmpl.html"
    "bootstrap"
  ],
  ($,_,Backbone,HTML,HomeViewTemplate) ->
    class home_view extends Backbone.View
      el: $ '.app'
      events: () ->
        "blur input#__username__": "__save__"
      __save__: (e) ->
        console.log @$el
      render: () ->
        data =
          msg: "I am a cat!"
        compiledTmpl = _.template $(HomeViewTemplate).html(), data
        @$el.append compiledTmpl
      initialize: () ->
        @render()
    homeView = new home_view
