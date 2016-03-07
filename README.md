# Geolocation App 1.0.0
A simple app that will fetch the current location of the user and will display it on the google static map.

**Note:** Geolocation App uses HTML5 Geolocation API to get the geographical position of the user. For privacy reasons, the position data is not available unless the user grants the permission to share it when being prompted. 

##Getting started
* Download the [`zip` archive](https://github.com/lu000094/geolocation-app/archive/master.zip)
* Extract the archive and open the `index.html` with your favourite browser

`index.html` contains link to Geolocation App CSS file and JS files

```html
<!-- Geolocation App CSS file -->
<link rel="stylesheet" type="text/css" href="css/app.css" />
<!-- Geolocation App JS file -->
<script src="script/core.js"></script>
<script src="script/app.js"></script>
```
###Calling Geolocation App

Geolocation App is being called at the bottom of the `app.js`. So it will start running automatically after the page loads.

```javascript
  // First instantiate the Geolocation App class available under japp namespace
  var Geolocation = new japp.geolocation();
  // Call the render method
  Geolocation.render();
```

##Changing the setting
Read below Configuration options which can be passed to Geolocation App
```
Example - Changing the error text
window.onload  = function(){
  // Defining options to be passed to the Geolocation App
  var options = {
    error: {
      geolocationNotSupportedErrorText  : 'ERROR: You are using an old browsers that doesn't support Geolocation features. Kindly upgrade your browsers.'
    }
  }
  // Pass the options as parameter to the geolocation class
	var Geolocation = new japp.geolocation(options);
	Geolocation.render();
}
```

##Configuration options

###General

**canvasClass**
CSS classname that will be added to the dynamically genrated canvas element
```
default: 'map-canvas'
```

**error**
An Object containing the error options (Refer Error Options below)


######ERROR OPTIONS:

**errorClass**
CSS classname that will be added to the dynamically genrated error panel div element
```
default: 'error-panel'
```

**geolocationNotSupportedErrorText**
Text that will appear when the HTML5 Geolocation feature is not supported by the browser
```
default: 'ERROR: Geolocation is not supported by this browser.'
```

**permissionDeniedErrorText**
Text that will appear when the user denied the permission to share location
```
default: 'ERROR: User did not share geolocation data'
```

**positionUnavilableErrorText**
Text that will appear when the user's current location cannot be detected
```
default: 'ERROR: Could not detect current position'
```

**timeOutErrorText**
Text that will appear when it is taking long time more than it should while trying to retrieve the position of the user
```
default: 'ERROR: Timeout while trying to retrieve position'
```

**unknownErrorText**
Text that will appear when an unkwnon error occurs while trying to get user's current location
```
default: 'ERROR:An unknown error has occured'
```

###Map

**mapAPIurl**
API URL for the map. It is advisable to use HTTPS as user's location is a sensitive personal information
```
default: 'http://maps.googleapis.com/maps/api/staticmap'
```

**mapOptions**
An Object containing the map options (Refer Map Options below)

######MAP OPTIONS:

Map options is not limited to the options mentioned here. Any Map Parameters supported by Google Static Map can be used. Know more about the [supported Map Option here](https://developers.google.com/maps/documentation/static-maps/intro)

**size**
Dimesion for the map in (width x height format)
```
default: '400x400'
```

**zoom**
Zoom level for the map. For more information, see more on [zoom levels here](https://developers.google.com/maps/documentation/static-maps/intro#Zoomlevels)
```
default: '14'
```

**maptype**
The type of the map to use
```
default: 'roadmap'
options: 'roadmap', 'satellite', 'hybrid', 'terrain'
```

**format**
The format of the map image
```
default: 'PNG'
options: 'GIF', 'JPEG', 'PNG'
```

###Public methods

**setMarker**
Sets a marker on the map
```
setMarker(coordinate, label, color)
arguments: 
  coordinate: An object containing latitude and longitude coordinates, or a string 'currentPosition' to indicate current location
  label: A string that will be appear as a label on the marker 
  color: Name of the color which will be applied to the label and the marker. 
         Pre-defined values: black, brown, green, purple, yellow, blue, gray, orange, red, white
Example:
  // This will sets a green marker on the current location of the user in the map
  Geolocation.setMarker('currentPosition', 'U', 'green');
  // This will sets a red marker on the 40.714728 latitude and -73.998672 logitude
  Geolocation.setMarker({latitude: 40.714728, longitude: -73.998672}, 'S', 'red');
```

**render**
Renders the map. Call this method after setting everything.
```
render()
Example:
  // This will sets a green marker on the current location of the user in the map
  Geolocation.Geolocation.render();
```

## Browser Compatibility

- IE 9+
- FF 3.5+
- Chrome 5+
- Safari 5+
- Opera 16+


## Changelog

### Version 1.0.0
- First version of the Geolocation App
