define [
			"jquery"
			"underscore"
			"backbone"
			"views/home"
			"views/user"
		],
		($,_,Backbone,HomeView,UserView) ->
			AppRouter = Backbone.Router.extend({
				routes: {
					"/user": "showUser"
					"*actions": "globalAction"
				}
			})

			initialize = () ->
				app_router = new AppRouter
				app_router.on("showUser", () ->
					userView = new UserView()
					userView.render()
				)
				app_router.on("globalAction", (actions) ->
					console.log 'No route:', actions
				)
				init = {initialize: initialize}
