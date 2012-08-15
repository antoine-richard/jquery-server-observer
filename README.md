jQuery Server Observer Plugin
=============================

HTML5's online/offline detection is a good idea but unfortunately it's unusable. Browsers implementations are inconsistent and the specification itself [says](http://www.whatwg.org/specs/web-apps/current-work/multipage/offline.html#event-online) we can not rely on this attribute.

No matter what _online_ means. As a web developer I only want to know if I can reach the server-side part of my application.

The Server Observer Plugin provides a simple and reliable way to check if the server-side application is available. Hopefully it will help people to use HTML5 offline mode.

Two mechanisms are used to check the server availability:

* By periodically _pinging_ a specified URL
* By observing any and all user-sent Ajax requests.

Thus the client-side application will be notified of any change in the server availability.

Usage
=====

The plugin provides three operations:

* `jQuery.serverObserver.enable(options)` - Starts observing the server availability.

	The `options` parameter is a set of key/value pairs that configure the Server Observer:
	
	* `url` - _Optional_ - A _ping_ URL on which a HEAD HTTP request will be sent to check the server availability. If no URL is provided, only user-sent Ajax requests will be observed.
	* `frequency` - _Optional, default: 3000_ - Time between each _ping_ (in milliseconds).
	* `onServerOnline` - Function to be called when the server becomes available. 
	* `onServerOffline` - Function to be called when the server becomes unavailable.

* `jQuery.serverObserver.disable()` - Stops the observation.

* `jQuery.serverObserver.isServerOnline()` - Returns true if the server's last known status is online.

Example
-------

	$.serverObserver.enable({
		url: "ping",
		frequency: 5000,
		onServerOnline: function() {
			// The server is available
		},
		onServerOffline: function() {
			// The server is unavailable
		}
	});


Cache
-----

Be sure to tell browsers to not cache the _ping_ URL's response by providing the correct headers.
If using the HTML5 Application Cache, make sure that the URL used for _pinging_ your application is declared in the NETWORK section.

Requirements
------------

jQuery Server Observer Plugin can be used with jQuery 1.7 and above.

Todo list
=========

* Write tests

Contributing
============

The Server Observer source code is hosted on GitHub.
Please feel free to report issues and submit pull requests.

Changelog
=========

**v0.2** - August 15th, 2012

* Added the `isServerOnline` method

**v0.1** - May 10th, 2012

* Initial release

License
=======

jQuery Server Observer Plugin is released under the MIT license (see included LICENSE file).
