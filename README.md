# Introduction

This repository contains a JavaScript file (`validations.js`) that provides functions for validating form fields and preparing a JSON object with the field values. These functions can be used to perform client-side validation before submitting form data to a server.

This JavaScript code provides a set of functions for validating DOM elements in a web form. It includes validations for fields such as name, email, dropdowns, checkboxes, and select options. The code also allows for displaying error messages on the screen and creating a JSON object of all the validated fields for further processing or debugging purposes

(**Note:** This repository is currently in active development mode, with ongoing enhancements and improvements. Contributions are welcome. If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.)

## Usage

To use the validation functions, follow these steps:

1. Include the jQuery library and Bootstrap in your HTML file:

Jquery is required meanwhile bootstrap style and scripts are optional.

```html
<script src="https://code.jquery.com/jquery-3.7.0.slim.min.js" integrity="sha256-tG5mcZUtJsZvyKAxYLVXrmjKBVLd6VpVccqz/r4ypFE="
    crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.min.js" integrity="sha384-cuYeSxntonz0PPNlHhBs68uyIAVpIIOZZ5JqeqvYYIcEL727kskC66kF92t6Xl2V"
    crossorigin="anonymous"></script>
```

2. Include the `validations.js` file:

```html
<script src="validations.js"></script>
```

3. Add form elements with appropriate attributes for validation. For example:

```html
<input type="text" class="form-control required" id="firstName" value="John" AttrType="name" AttrName="FirstName" AttrDesc="First Name" />
```

Here, the `AttrType` attribute specifies the type of validation to apply, the `AttrName` attribute defines the name/key for the JSON object, and the `AttrDesc` attribute provides a description for the field.

4. Call the validation functions as needed. For example, to validate all fields with a specific class:

```javascript
var isValid = ValidateFields("required");
if (isValid) {
    // Proceed with form submission or other actions
}
```

The `ValidateFields` function accepts a class name and validates all elements with that class. It returns `true` if all validations pass, otherwise `false`.

The `PrepareJsonObject` function can be used to prepare a JSON object with the field values:

```javascript
var jsonObject = PrepareJsonObject("required");
```

This function accepts a class name and returns a JSON object where the attribute names specified by the `AttrName` attribute are used as keys, and the corresponding field values are set as values in the object.

5. Customize the validation rules in the JavaScript file (`validations.js`) as per your requirements. You can add new validation types or modify existing ones to suit your needs.

# Code Documentation

This document provides an overview and explanation of the code in the provided script file. The script contains several functions related to form validation and handling of form elements. Each function is described below along with its purpose and usage.



## ValidateFields(className)
This function accepts a class name as a parameter and performs validations on the form elements with the specified class name. It retrieves the elements and their attributes, applies the appropriate validations, and stores any validation messages in an array. The function can be used to show validation messages on the frontend. The function returns `true` if all validations pass, and `false` otherwise.

**Usage:**
```javascript
ValidateFields(className);
```

## PrepareJsonObject(className)

This function prepares a JSON object by fetching all the form elements with the specified class name. The attribute name of each element is used as the key in the JSON object. The function iterates over the elements, retrieves their attributes and values, and assigns them to the JSON object based on the attribute type.

**Usage:**
```javascript
PrepareJsonObject(className);
```

## Utility Functions
The code also includes several utility functions that are used by the main validation functions

### IsNullOrEmpty(value)

This function checks if a string value is null or empty. It returns `true` if the value is null, undefined, empty, or contains only whitespace characters; otherwise, it returns `false`.

**Usage:**
```javascript
IsNullOrEmpty(value);
```

### IsNullOrWhitespace(input)

This function checks if a string input is null or consists of only whitespace characters. It returns `true` if the input is null or contains only whitespace characters; otherwise, it returns `false`.

**Usage:**
```javascript
IsNullOrWhitespace(input);
```

### IsValidEmail(email)

This function validates if a provided email address is valid. It checks if the email address is not null or empty and matches a specific email pattern. The function returns `true` if the email address is valid; otherwise, it returns `false`.

**Usage:**
```javascript
IsValidEmail(email);
```

### IsValidStringInput(value)

This function validates if a string input is valid. It checks if the input is not null or empty and does not contain multiple whitespace characters. The function returns `true` if the input is valid; otherwise, it returns `false`.

**Usage:**
```javascript
IsValidStringInput(value);
```

### IsValidName(value)

This function validates if a name input is valid. It checks if the input is not null or empty and consists only of alphabetic characters. The function returns `true` if the name is valid; otherwise, it returns `false`.

**Usage:**
```javascript
IsValidName(value);
```

### CleanInt(value)

This function parses a string to an integer safely by handling undefined, null, and NaN conditions. It returns the parsed integer value or 0 if the value is undefined, null, or NaN.

**Usage:**
```javascript
CleanInt(value);
```

## Element Manipulation Functions
The code provides functions for enabling/disabling elements by their ID or class name
### DisableElement(id)

This function disables an HTML element identified by its id. It sets the "disabled" attribute of the element to true.

**Usage:**
```javascript
DisableElement(id);
```

### EnableElement(id)

This function enables a disabled HTML element identified by its id. It removes the "disabled" attribute from the element.

**Usage:**
```javascript
EnableElement(id);
```

### DisableElements(className)

This function disables all HTML elements with the specified class name. It iterates over the elements, setting their "disabled" attribute to true.

**Usage:**
```javascript
DisableElements(className);
```

### EnableElements(className)

This function enables all disabled HTML elements with the specified class name. It iterates over the elements, removing their "disabled" attribute.

**Usage:**
```javascript
EnableElements(className);
```

Please note that this code assumes the presence of the jQuery library as it uses jQuery selectors and methods


## Contributing

Contributions to this repository are welcome. If you find any issues or have suggestions for improvements, please create an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
