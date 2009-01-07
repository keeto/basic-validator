Basic Validator
===============

This is a basic data validator in Javascript and uses the powerful Mootools library.


### Usage:

    Validator.test(value, type);

    
### Arguments:

1. **value** - (*string*) The value to be checked.
2. **type** - (*string*, defaults to "alphaNum") The datatype to be checked.


### Returns:

* (*boolean* or *null*) Returns null if the value is not string. Otherwise, returns `true` or `false` depending on whether the value is of a particular datatype.



The Validator Object
--------------------

Validator.js contains the main script that creates the `Validator` object. The `Validator:test` method is the primary function used to test the value, but there are several other methods available:

* `Validator:isEmpty` - Checks whether a string is empty. It will return true for "" as well as something like "     "
* `Validator:ofLength` - Checks whether the string is of within specific length. Calling `Validator.ofLength(str, 10, 20)` will check whether `str` is more than or exactly 10 characters and is less than or exactly 20 characters.
* `Validator:addType` - Adds a new datatype to Validator. (See below).
* `Validator:addTypes` - Same as `Validator:addType`, but can add multiple types at once.

For more information on these methods, see the full documentation at Docs/Validator.md



DataTypes
---------

Within the `Validator` object is a property called `exps`, which is essentially a hash containing key-value pairs. The keys are the names of the datatypes and the value is a regular expression used to check the value passed. There are several "pre-built" datatypes included:

* **"alpha"** - checks whether the value contains only letters of the alphabet, whitespaces and punctuation marks.
* **"alphaStrict"** - checks whether the value contains only letters of the alphabet.
* **"alphaNum"** - checks whether the value contains only alpha-numeric characters, whitespaces and punctuation marks.
* **"alphaNumStrict"** - checks whether the value contains only alpha-numeric characters.
* **"number"** - checks whether the value is a number.
* **"email"** - checks whether the value is a valid email address.
* **"URL"** - checks whether the value is a valid url address.

To test a value against a datatype, simply pass the name of the datatype as the second argument to the `Validator:test` method. Take note that the names for data types are case sensitive (i.e. "URL" is different from "url").


### Examples:
    
    Validator.test("Mark Obcena", "alpha");          // Returns true;
    Validator.test("Mark Obcena", "number");         // Returns false;
    Validator.test("markeeto@gmail.com", "email");   // Returns true;
    Validator.test("http://google.com", "URL");      // Returns true;


    
Adding More DataTypes
---------------------

You can use the `Validator:addType` method to create additional datatypes. It requires two arguments: the name of the datatype and a regular expression object that will be used to check values.

### Example:

    // Add a new "date" datatype that checks
    // if the value is in the format "dd/mm/yyyy"
    Validator.addType("date", /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/);



Magic "isDataType" Methods
--------------------------

For each datatype, a special "isDataType" method is automatically created within the Validator object. These magic methods are shortcut functions that require only one argument: the value to be passed. So with the prebuilt datatypes, the Validator object obtains the following magic methods: isAlpha(), isAlphaStrict(), isAlphaNum(), isAlphaNumStrict(), isNumber(), isEmail() and isURL(). You'll then be able to use them as such:

    Validator.isAlpha("Mark Obcena");           // == Validator.test("Mark Obcena", "alpha");
    Validator.isEmail("markeeto@gmail.com");    // == Validator.test("markeeto@gmail.com", "email");

Conveniently, magic methods are also created for all new datatypes added using the `Validator:addType`. So with the example above, a new `Validator:isDate` method is created.

Take note that Validator automatically capitalizes the first letter of the name of the datatype for magic methods, so a datatype with the name "phone" will become "isPhone()". However, the capitalization of other letters within the name stay the same, (e.g. "URL" > "isURL()" or "camelCasedName" > "isCamelCasedName()");



Validator.Extensions
--------------------

Validator.Extensions.js contains functions that will extend both the native String and Element datatypes.


### String Extensions

Strings are given a new method `validate()`, which is equivalent to using Validator.test(), but only requires one parameter: the datatype to be tested:

    // This will be equivalent:
    Validate.test("Mark Obcena", "alpha") == "Mark Obcena".validate("alpha");
    
The methods isEmpty() and ofLength will also be available to String, as well as any magic "isDataType" method:

    "Mark".isEmpty();        // Returns false
    "    ".isEmpty();        // Returns true
    
    "Mark".ofLength(4, 5);   // Returns true
    
    "markeeto@gmail.com".isEmail();        // Returns true
    
    // This will be equivalent:
    Validator.isURL("http://google.com") == "http://google.com".isURL();
    
Like with the Validator object, all new "isDataType" methods created when using `addType()` will automatically be added to the native String object:

    // Add datatype..
    Validator.addType("date", /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/);
    
    // Now accessible from strings..
    "02/01/2009".isDate();
    

### Element Extensions

Like Strings, Elements extended through the Mootools $() and $$() functions are also given the `validate()` function. There's one catch though: you can only use it with &lt;input&gt; and &lt;textarea&gt; elements. The value of these elements are automatically fetched, so no need to get them manually.

    var myTextArea = $("text-area-id");
    myTextArea.isAlpha();
    
    var myTextInput = $("input-email");
    myTextInput.isEmail();