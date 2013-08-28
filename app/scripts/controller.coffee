define [
    "views/home"
  ],
  (HomeView) ->
    "use strict"

    initialize = () ->
      logAction: (action) ->
        console.log action
        app.content.show new HomeView

    init = {initialize: initialize}
