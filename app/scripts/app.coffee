define [
	'backbone'
	'marionette'
	'msgbus'
], (Backbone, Marionette, msgBus) ->

	HNHeartbeat = new Marionette.Application()

	HNHeartbeat.addRegions
		accessRegion: '#access-region'
		headerRegion: '#header-region'
		lookupRegion: '#lookup-region'
		loginRegion: '#login-region'
		graphRegion: '#graph-region' # Hackers will be presented in graphs, which will call Overviews
		overviewRegion: '#overview-region' # Overviews will contail Items

  HNHeartbeat.on 'initialize:after', () ->
  	Backbone.history.start() unless Backbone.history.started

  HNHeartbeat.addInitializer () ->
  	# msgBus.commands.execute 'login:route'
  	# msgBus.commands.execute 'overview:route'
  	msgBus.commands.execute 'hacker:route'

  msgBus.events.on 'app:show', (view) =>
  	# HNHeartbeat.loginRegion.show view
  	# HNHeartbeat.overviewRegionshow view
  	msgBus.graphRegion.show view
  	
  HNHeartbeat
