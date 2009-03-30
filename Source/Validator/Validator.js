/*

Script: Validator.js
    Basic data validation Library
    
Author:
    Mark Obcena <markeeto@gmail.com>
    
Usage:
    Validator.test(str, type);

Documentation:
    See /Docs/Validator.md
    
License:

    Copyright (c) 2008 Mark Obcena

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
    
*/

var Validator = new Hash({

    exps: new Hash({
        "alpha": /^[a-zA-z\s\D]+$/,
        "alphaStrict": /^[a-zA-z]+$/,
        "alphaNum": /^[0-9a-zA-Z\s\D]+$/,
        "alphaNumStrict": /^[0-9a-zA-Z]+$/,
		"number": /^[0-9]+$/,
		"email": /^[a-z0-9_+.-]+\@([a-z0-9-]+\.)+[a-z0-9]{2,4}$/,
        "URL": /https?:\/\/([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+([a-zA-Z]{2,9})(:\d{1,4})?([-\w\/#~:.?+=&%@~]*)/
    }),

    test: function(value, type){
        return ($type(value) == "string") ? (this.exps.get(type) || this.exps.get("alphaNum")).test(value) : null;
    },

    isEmpty: function(value){
        return value.replace(/\s/g, "").length == 0;
    },

    ofLength: function(value, min, max){
        min = min || 0; 
        max = max || 10000000000000000;
        return value.length >= min && value.length <= max;
    },

    addType: function(key, value){
        if ($type(key) == "string" && $type(value) == "regexp") {
            var name = "is" + key.capitalize();
            this.exps.set(key, value);
            this.set(name, function(value){
				return this.test(value, key);
			});
            return true;
        } else {
            return false;
        }
    },

    addTypes: function(pairs){
        var that = this;
        if ($type(pairs) == "object") {
            pairs = $H(pairs);
            pairs.each(function(value, key){
               that.addType(key, value);
            });
            return true;
        } else {
            return false;
        }
    }

});

(function() {
    Validator.exps.each(function(value, key){
        Validator.addType(key, value);
    });
})();