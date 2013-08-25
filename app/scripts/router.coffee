define [
    "jquery"
    "underscore"
    "backbone"
    "views/home"
    "views/dashboard"
  ],
  ($,_,Backbone,HomeView,DashboardView) ->
    AppRouter = Backbone.Router.extend({
      routes: {
        "/user": "showUser"
        "*actions": "globalAction"
      }
    })

    initialize = () ->
      app_router = new AppRouter
      app_router.on("showUser", () ->
        dashboardView = new DashboardView()
        dashboardView.render()
      )
      app_router.on("globalAction", (actions) ->
        console.log 'No route:', actions
      )

    init = {initialize: initialize}
