/*
 * jQuery Server Observer Plugin
 * Version 0.1.0
 *
 * https://github.com/antoine-richard/jquery-server-observer
 *
 * Copyright (c) 2012 Antoine Richard
 * jQuery Server Observer Plugin is released under the MIT license (see included LICENSE file).
 * 
 */

(function($) {

	$.serverObserver = (function() {
		
		var	timer,
			serverStatus = "unknown";
		
		/**
		 * Observes the server availability.
		 * 
		 * The 'options' parameter is a set of key/value pairs:
		 * - 'url' - [Optional] A "ping" URL on which a HEAD HTTP request will be sent to check the server availability.
		 *    If no URL is provided, only user-sent Ajax requests will be observed.
		 * - 'frequency' - [Optional, default: 3000] Time between each "ping".
		 * - 'onServerOnline' - A function called when the server becomes available.
		 * - 'onServerOffline' - A function called when the server becomes unavailable.
		 */
		function observe(options) {
			
			// when ANY ajax request completes successfully
			$(document).on("ajaxSuccess.serverObserver", function(event, request, settings) {
				if (!settings.crossDomain && serverStatus != "online") {
					serverStatus = "online";
					options.onServerOnline.apply(request);
				}
			});
			
			// when ANY ajax request completes with an error
			$(document).on("ajaxError.serverObserver", function(event, request, settings) {
				if (!settings.crossDomain && serverStatus != "offline") {
					serverStatus = "offline";
					options.onServerOffline.apply(request);
				}
			});
			
			// periodically test the given URL (with a HEAD request)
			options.url && (function loop() {
				timer = setTimeout(function() {
					$.ajax({
						url: options.url,
						type: "HEAD",
						complete: loop
					});
				}, options.frequency || 3000);
			})();
			
		}
		
		/**
		 * Stops observing.
		 */
		function stop() {
			timer && clearTimeout(timer);
			$(window).off(".serverObserver");
		}
		
		/** Public API */
		return {
			enable: observe,
			disable: stop
		};
		
	})();
	
})(jQuery);
