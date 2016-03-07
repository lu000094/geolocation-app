// Namespace
var japp = japp || {};

/**
* Provides Inheritance
* @param function childClass
*  - The childClass which will inherit the baseClass
* @param function baseClass
*  - The baseClass which will be inherited to the childClass
*/
japp.extends = japp.extends || function(childClass, baseClass){
	childClass.prototype   = baseClass.prototype;
	childClass.constructor =  baseClass;
}

/**
* Base class
*
* This class is not to be instantiated, rather this has to be drived and used in the childClass
*
* @version v1.0
*/
japp.core = (function(){

	/**
	* Constructor function
	*/
	function _core(options){
		this.options = options;
	}
	
	/**
	* Prints a string
	*
	* @param string strToPrint;
	*  - String to be printed
	* @param string className
	*  - A classname for the panel 
	*/
	_core.prototype.print = function(strToPrint, className){
		if(typeof strToPrint !== 'string'){
			return;
		}
		
		var panelNode = document.createElement('div');
		var textNode  = document.createTextNode(strToPrint);
		
		panelNode.appendChild(textNode);
		
		if(className){
			panelNode.setAttribute('class', className);
		}
		
		document.body.appendChild(panelNode);
	}
	
	
	/**
	* Gets an encoded URL querystring parameter
	*
	* @param object params
	*  - A list of string with key and value pairs
	* @param boolean isUriEncode
	*  - True|False indicating encodeURI or encodeURIComponent to use for encoding
	* @return string
	*  - URl encoded querystring
	*/
	_core.prototype.getUrlParam = function(params, isUriEncode){
	   var urlParam = [];
	   isUriEncode = (typeof isUriEncode === 'undefined') ? true : isUriEncode;
	   
	   var encodeParam = function(item, isUriEncode){
	      return isUriEncode ? encodeURI(item) : encodeURIComponent(item);
	   }
	   
	   var paramKey, paramValue, i = 0, len;
	   
	   for(var paramItem in params){
	   	  if(params.hasOwnProperty(paramItem)){
				  paramKey   = isUriEncode ? encodeURI(paramItem) : encodeURIComponent(paramItem);
				  paramValue = isUriEncode ? encodeURI(params[paramItem]) : encodeURIComponent(params[paramItem]);
				  urlParam.push(paramKey +"="+ paramValue);
		  }
		}
	   return urlParam.join("&");
	},

	/**
	* Merges two object
	*
	* @param object targetObj
	*  - the Target object to which the source object will be merged
	* @param object sourceObj
	*  - The object that will be merged to the target object
	* @return object 
	*  - The merged object
	*/
	_core.prototype.getOptions = function(targetObj, sourceObj){
		
		for(var objItem in sourceObj){
			if(sourceObj.hasOwnProperty(objItem)){
				if (typeof sourceObj[objItem] === "object") {
					targetObj[objItem] = targetObj[objItem] || {};
					arguments.callee(targetObj[objItem], sourceObj[objItem]);
				}
				else{
					targetObj[objItem] = sourceObj[objItem];
				}
			}
		}
		
		return targetObj;
		
	}
	
	/**
	* Checks a given item is an array
	*
	* @param mixed item
	*  - An item to be checked for array
	* @return boolean
	*  - true/false indicating it's an array or not
	*/
	_core.prototype.isArray = function(item){
		return Object.prototype.toString.call(item) == '[object Array]';
	}
	
	return _core;
	
})()