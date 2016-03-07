/**
* Geolocation Class
*
* This class detects user current location and displays it in the google static map
* The map is drawn on the canvas.
*
* @version v1.0
*/
japp.geolocation = (function(_super){

	// Inherits from core class
	japp.extends(_geolocation, _super);
	
	// Default settings
	var defaultSettings = {
			canvasClass : 'map-canvas',
			error       : {
							errorClass                        : 'error-panel',
							geolocationNotSupportedErrorText  : 'ERROR: Geolocation is not supported by this browser.',
							permissionDeniedErrorText         : 'ERROR: User did not share geolocation data',
							positionUnavilableErrorText       : 'ERROR: Could not detect current position',
							timeOutErrorText                  : 'ERROR: Timeout while trying to retrieve position',
							unknownErrorText                  : 'ERROR: An unknown error has occured'
						  },
			mapAPIurl   : 'http://maps.googleapis.com/maps/api/staticmap',
			mapOptions  : {
							size    : '400x400',
							zoom    : '14',
							maptype : 'roadmap',
							format  : 'png'
						   }
		};
	
	// This is the placeholder of the currentposition
	var currentPositionPlaceHolder = "{{currentPosition}}";
	var markername                 = 'markers';
	
	/**
	* Constructor function
	*
	* @param string|null apikey
	*  - An optional Google API key
	* @param object|null options
	*  - An optional object containing override of the default settings
	*/	
	function _geolocation(options){
	    _super.call(this);
		
		this.options = this.getOptions(defaultSettings, options);
		this.markers = [];
	}
	
	/**
	* Sets marker on the map
	*
	* @param object|string coordinate
	*   - An object containing latitude and longitude coordinates, or a string 'currentPosition' to indicate current location
	* @param string label
	*   - A string to appear as a label on the marker
	* @param string color
	*   - Color name 
	*/
	_geolocation.prototype.setMarker = function(coordinate, label, color){
		var markerItem = [];
		markerItem.push('color:'+ color);
		markerItem.push('label:'+ label);
		
		// If it's currenposition add the placeholder
		if(coordinate === 'currentPosition'){
			markerItem.push(currentPositionPlaceHolder);
		}
		else{
			markerItem.push(coordinate.latitude +','+ coordinate.longitude);
		}
		
		this.markers.push(markerItem.join('|'));
	}
	
	/**
	* Gets the defined marker for the map
	*
	* @param object replaceStr
	*   - An object containing the replace string for the placeholder
	* @return array
	*   - Returns a formated marker array list item
	*/
	_geolocation.prototype.getMarker = function(replaceStr){
		var self       = this;
		var len        = this.markers.length;
		var count      = 0;
		var markers    = [];
		var markerItem;
		
		for(; count < len; count++){
			markerItem          = self.markers[count];
			markers.push(markerItem.replace(currentPositionPlaceHolder, replaceStr[currentPositionPlaceHolder]));
		}
		
		return markers;
	}
	
	/**
	* Renders the map 
	*/
	_geolocation.prototype.render = function(){
		var self = this;
		
		this.getLocation(function(position){
			var coords                             = position.coords;
			var mapOptions                         = self.options.mapOptions;
			var replaceStr                         = {};
			
			mapOptions.center                      = coords.latitude +','+ coords.longitude;
			replaceStr[currentPositionPlaceHolder] = mapOptions.center;
			
			var markers                            = self.getMarker(replaceStr);
			var mapImg                             = self.getStaticMap(mapOptions, markers);
			
			mapImg.onload = function(){
				var canvas                         = self.canvasdrawImg(mapImg);
				document.body.appendChild(canvas);
			}
		},
		// Error Handler
		function(err){
			switch(err.code)
            {
                case err.PERMISSION_DENIED: 
                	self.print(self.options.error.permissionDeniedErrorText, self.options.error.errorClass);
                	break;
                case err.POSITION_UNAVAILABLE: 
                	self.print(self.options.error.positionUnavilableErrorText, self.options.error.errorClass);
                	break;
                case err.TIMEOUT: 
                	self.print(self.options.error.timeOutErrorText, self.options.error.errorClass);
                	break;
                default: 
                	self.print(self.options.error.unknownErrorText, self.options.error.errorClass);
                	break;
            }
			
		});
	}
	
	/**
	* Draw an image on the canvas
	*
	* @param object img
	*   - An image node object
	* @param object|null canvas 
	*   - An optional canvas node object
	* @return object
	*   - Returns a canvas node object
	*/
	_geolocation.prototype.canvasdrawImg = function(img, canvas){
		canvas        = canvas || document.createElement('canvas');
		
		var ctx       = canvas.getContext("2d");
		var imgSize   = this.options.mapOptions.size.split('x');
		
		canvas.width  = imgSize[0];
		canvas.height = imgSize[1];
		
		canvas.setAttribute('class', this.options.canvasClass);
		ctx.drawImage(img, 0, 0, imgSize[0], imgSize[1]);
		
		return canvas;
	}
	
	/**
	* Gets current user location
	*
	* @param function|null locationCallback
	*  - An optional callback which will be called when location is retrieved
	* @param function|null errorCallback
	*  - An optional callback which will be called when an error has occurred 
	*/
	_geolocation.prototype.getLocation = function(locationCallback, errorCallback){
	
		locationCallback = locationCallback || function(){};
		errorCallback    = errorCallback    || function(){};
		
		// Checks if the browser support geolocation
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(locationCallback, errorCallback);
		} else {
			this.print(this.options.error.geolocationNotSupportedErrorText, this.options.error.errorClass);
		}
		
	}

	/**
	* Gets a google static map
	*
	* @param object|null mapOptions
	*  - An optional object containing settings for the map
	* @param array|null markersOptions
	*  - An optional array list containing the marker settings for the map
	* @return object of the newly created image
	*/
	_geolocation.prototype.getStaticMap = function(mapOptions, markersOptions){
		
		if(!mapOptions){
			mapOptions = this.options.mapOptions;
		}
		
		var self         = this;
		var mapImg       = new Image();
		var paramOptions = this.getUrlParam(mapOptions, true);
			
		if(this.isArray(markersOptions)){
			var len     = markersOptions.length;
			var i       = 0;
			var markers = {};
			
			for(; i < len; i++){
				if(i < len){
					paramOptions += '&';
				}
				
				markers[markername] = markersOptions[i];
				paramOptions       += self.getUrlParam(markers, true);
			}
		}
		
		mapImg.src = this.options.mapAPIurl +'?'+ paramOptions;
		
		return mapImg;
		
	}
	
	return _geolocation;

})(japp.core);


window.onload  = function(){
	var Geolocation = new japp.geolocation();
	Geolocation.setMarker('currentPosition', 'U', 'green');
	Geolocation.render();
}
