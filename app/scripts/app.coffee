define [
	'backbone'
	'marionette'
	'msgbus'
], (Backbone, Marionette, msgBus) ->

	HNHeartbeat = new Marionette.Application()

	HNHeartbeat.addRegions
		accessRegion: '#access-region'
		headerRegion: '#header-region'
		mainRegion: '#main-region'
		lookupRegion: '#lookup-region'

  HNHeartbeat.on 'initialize:after', () ->
  	Backbone.history.start() unless Backbone.history.started

  HNHeartbeat.addInitializer () ->
  	msgBus.commands.execute 'hacker:route'

  msgBus.events.on 'app:show', (view) =>
  	# HNHeartbeat.accessRegion.show view
  	# HNHeartbeat.headerRegion.show view
  	HNHeartbeat.mainRegion.show view
  	# HNHeartbeat.lookupRegion.show view
  	HNHeartbeat.loginRegion.show view
  	
  HNHeartbeat
