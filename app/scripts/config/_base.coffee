# Filename: config/_base.coffee
define [
    "backbone"
    "Q"
], (Backbone, Q) ->
  # Using Q for Promises
  window.Q = Q

  oldSync = Backbone.sync

  Backbone.sync = (method, model, options) ->

    options.beforeSend = (xhr) ->

      meta_token$ = $ "meta[name='x-csrf-token']"

      crsf_token = meta_token$.attr 'content'

      xhr.setRequestHeader 'X-CSRFToken', crsf_token

    oldSync(method, model, options)
