/*

Script: Validator.Extensions.js
    Add validation methods to String and Elements
    
Author:
    Mark Obcena <markeeto@gmail.com>

Documentation:
    See /Docs/Validator.Extensions.md
    
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

if ($type(Validator) == "hash") {

    /*
     Rewrite the Validator:addType method to
     automatically add magic "isXType" methods.
    */
    Validator.addType = function(key, value){
        if ($type(key) == "string" && $type(value) == "regexp") {
            var name = "is" + key.capitalize();
            this.exps.set(key, value);
            this.set(name, function(value){
				return this.test(value, key);
			});
            var method = {};
            method[name] = function(){
				return this.validate(key);
			};
            Native.implement([String, Element], method);
            return true;
        } else {
            return false;
        }
    };

    // Adds new methods to String
    String.implement({

        validate: function(type){
            return Validator.test(this, type);
        },

        isEmpty: function(){
            return Validator.isEmpty(this);
        },

        ofLength: function(min, max){
            return Validator.ofLength(this, min, max);
        }

    });

	Validator.Stringable = ["input", "textarea"];
	Validator.canValidate = function(tag){
		return Validator.Stringable.contains(el.getTag());
	};

    // Adds new methods to Element
    Element.implement({

        validate: function(type){
            return Validator.canValidate(this) ? Validator.validate(this.value, type) : null;
        },

        isEmpty: function(){
            return Validator.canValidate(this) ? Validator.isEmpty(this.value) : null;
        },

        ofLength: function(min, max){
            return Validator.canValidate(this) ? Validator.ofLength(this.value, min, max) : null;
        }

    });


    // Add magic "isDataType" methods to both String and Element
    (function(){
        var methods = {};
        Validator.exps.getKeys().each(function(key){
                var name = "is" + key.capitalize();
                methods[name] = function(){ 
					return this.validate(key);
				};
        });
        Native.implement([String, Element], methods);
    })();

}