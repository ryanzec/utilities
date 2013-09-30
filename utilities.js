/**
 * A collection of useful utility functions
 *
 * @module utilities
 */
window.utilities = (function(){
  var htmlEntityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  return {
    /**
     * Converts JSON to a query string
     *
     * @method jsonToQueryString
     *
     * @param {object} jsonObject Object to convert
     * @param {string} prefix Prefix for the key names
     *
     * @returns {string}
     */
    jsonToQueryString: function(jsonObject, prefix) {
      var str = [];
      var keys = Object.keys(jsonObject);
      var keyCount = keys.length;

      for(var i = 0; i < keyCount; i += 1) {
        var jsonKey = prefix ? prefix + "[" + keys[i] + "]" : keys[i];
        var jsonValue = jsonObject[keys[i]];

        str.push(typeof jsonValue === "object"
        ? utilities.jsonToQueryString(jsonValue, jsonKey)
        :encodeURIComponent(jsonKey) + "=" + encodeURIComponent(jsonValue));
      }

      return str.join("&");
    },

    /**
     * Searches an array of objects by property value
     *
     * @method getObjectByPropertyValue
     *
     * @param {object[]} data Array of object to search
     * @param {string} property Key to search the object on
     * @param {*} value Value to search the property for
     *
     * @returns {*} First object that matches the property/value pair
     */
    getObjectByPropertyValue: function(data, property, value) {
      for(var prop in data) {
        if(data.hasOwnProperty(prop)) {
          if(data[prop][property] === value) {
            return data[prop];
          }
        }
      }
    },

    /**
     * Searches an array of objects for the index of the first object by property value
     *
     * @method getKeyByPropertyValue
     *
     * @param {object[]} data Array of object to search
     * @param {string} property Key to search the object on
     * @param {*} value Value to search the property for
     *
     * @returns {number} The index of the object that first matching the property/value pair (-1 if none match)
     */
    getKeyByPropertyValue: function(data, property, value) {
      for(var x = 0; x < data.length; x+= 1) {
        if(data[x][property] === value) {
          return x;
        }
      }

      return -1;
    },

    /**
     * Allows for safe searching of multi-dimensional properties of a object without erroring if some item in the list does not exist
     *
     * @method stringJsonParser
     *
     * @param {string} stringPath Property path to search for in string form
     * @param {object} object Object to perform the search on
     * @returns {*|undefined}
     */
    stringJsonParser: function(stringPath, object) {
      var returnValue = {};

      if(stringPath.length > 0) {
        returnValue = object;
        //todo: this should be a utility function
        var parts = stringPath.split('.');

        for(var x = 0; x < parts.length; x += 1) {
          returnValue = _.isObject(returnValue) ? returnValue[parts[x]] : undefined;
        }
      }

      return returnValue;
    },

    escapeHtml: function() {
      return String(string).replace(/[&<>"'\/]/g, function (s) {
        return htmlEntityMap[s];
      });
    }
  }
}());