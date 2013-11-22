(function() {
  define(["backbone", "Q"], function(Backbone, Q) {
    var oldSync;
    window.Q = Q;
    oldSync = Backbone.sync;
    return Backbone.sync = function(method, model, options) {
      options.beforeSend = function(xhr) {
        var crsf_token, meta_token$;
        meta_token$ = $("meta[name='x-csrf-token']");
        crsf_token = meta_token$.attr('content');
        console.log(crsf_token);
        return xhr.setRequestHeader('X-CSRFToken', crsf_token);
      };
      return oldSync(method, model, options);
    };
  });

}).call(this);
