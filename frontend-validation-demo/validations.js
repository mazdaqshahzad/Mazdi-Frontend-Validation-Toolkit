//This is the core function. This function accepts a class name,
//Get all the elements and their attributes with the provided class name,
//And Apply the proper validations on them. and store the message in an array that
//can be used later to show validations message on the frontend. 
function ValidateFields(className) {

    var msgList = [];

    try {

        $(`.${className}`).each(function (i, obj) {

            var elementId = $(obj).attr("id");
            var attrtype = $(obj).attr("AttrType");
            var attrName = $(obj).attr("AttrName");
            var attrDesc = $(obj).attr("AttrDesc");
            var value = $(obj).val();

            let msgObj = {
                ElementId: elementId,
                Message: null
            };

            // * Email Validation *
            if (attrtype == "email") {

                //Email not provided
                if (IsNullOrEmpty(value)) {
                    msgObj.Message = `${attrDesc} is Required`;
                }
                //provided Email is not in correct format.
                else if (IsValidEmail(value) == false) {
                    msgObj.Message = `Enter a valid ${attrDesc}`
                }
            }

            // * Password Validation *
            // Please customize this condition according to your own password requirements
            else if (attrtype == "password") {

                //to check if password is bunch of whitespaces or a valid password.
                if (IsValidStringInput(value) == false) {
                }
                else if (value.length < 6) {
                    msgObj.Message = "Minimum of 6 characters are required.";
                }
            }

            // * Text Fields Validations *
            // Simple text validations such as capturing address information.
            else if (attrtype == "text") {
                if (IsValidStringInput(value) == false) {
                    msgObj.Message = `${attrDesc} is Required`;
                }
            }

            // * Name Fields Validations *
            else if (attrtype == "name") {

                //This will check if name is provided or not
                if (IsNullOrEmpty(value)) {
                    msgObj.Message = `${attrDesc} is Required.`;

                }
                //This Will check if provided text is a name. for example a name cannot contain
                //letter other than alphabets. so there is customize method. feel free to add code according
                //to your own requirmetns of how a Name for a user should look like.
                else if (IsValidName(value) == false) {
                    `${attrDesc} should contain Alphabets only`;
                }
            }

            // * Dropdown Integer Selected
            //This method is for validating those dropdown that contains integer as their options values such "<option value="1"> Real Madrid </option>"
            else if (attrtype == "dropdownInt") {
                if (CleanInt(value) <= 0) {
                    msgObj.Message = `${attrDesc} is Required`;
                }
            }

            // * Dropdown Text Selected
            // This method is for validating selected option text  such as "<option value="rm" selected> Real Madrid </option>"
            //Validation will be applied on the selected option text "Real Madrid" and not on its option value ("rm")
            else if (attrtype == "dropdownText") {
                var selectedOptionText = $(`#${elementId} option:selected`).text();
                if (IsNullOrEmpty(selectedOptionText) || selectedOptionText.toLowerCase().trim() == "please select") {
                    msgObj.Message = `${attrDesc} is Required`;
                }
            }

            // * Dropdown2 Option Selected
            // This method is for validating selected option value  such as "<option value="rm" selected> Real Madrid </option>"
            //Validation will be applied on the selected option value "rm" and not on its text which is ("Real Madrid")
            else if (attrtype == "dropdownText2") {
                if (IsNullOrEmpty(value) || value.toLowerCase().trim() == "please select") {
                    msgObj.Message = `${attrDesc} is Required`;
                }
            }

            // * Checkbox
            else if (attrtype == "checkbox") {
                var isChecked = $(`#${elementId}`).is(":checked")
                if (isChecked == null || isChecked == undefined || isChecked == false) {
                    msgObj.Message = `Please Mark Checkbox ${attrDesc}`
                }
            }


            // * Date 
            else if (attrtype == "date") {
                var selectedDate = new Date($(`#${elementId}`).val());
                if (selectedDate == null || selectedDate == undefined) {
                    msgObj.Message = "Please Select a Valid Date"
                }
            }


            //If message is not null it means a validation error has occured. so add it to the array.
            if (msgObj.Message != null) {
                msgList.push(msgObj);
            }

        });

    }
    catch (ex) {
        console.log(ex);
        msgList.push({ ElementId: "None", Message: "Invalid Data. Please Try Again" });
    }

    finally {
        //Enter Code here to show validation messages to the Frontend.
        //You call another method here that will accept the msgList array and then show the message one by one 
        //in a popup. or you can append the messages below each element by using element id in the msgList array.

        //For Demo Purpose. I'll show an alert message here. You need to remove this code in production and replace it with origianl code that will handle error mesages.
        if (msgList.length > 0) {
            var _messages = "";
            for (let i = 0; i < msgList.length; i++) {
                _messages = _messages + msgList[i].Message + "\n";
            }
            alert(_messages);
        }
    }

    return msgList.length <= 0; //It means error list is empty and all went okay. 
}


//This method will prepare json object by fetching all the elements by their class name,
//Json object key will be AttrName property of the element
function PrepareJsonObject(className) {

    var myObject = {};

    try {

        $(`.${className}`).each(function (i, obj) {

            var elementId = $(obj).attr("id");
            var attrType = $(obj).attr("AttrType");
            var key = $(obj).attr("AttrName"); //Attribute name will act as Key in json object
            var value = $(obj).val();


            if (attrType == "text") {
                myObject[key] = value;
            }

            else if (attrType == "password") {
                myObject[key] = value;
            }

            else if (attrType == "name") {
                myObject[key] = value;
            }

            else if (attrType == "email") {
                myObject[key] = value;
            }

            else if (attrType == "int") {
                myObject[key] = value;
            }

            else if (attrType == "date") {
                var _date = $(`#${id}`).val();
                if (_date != null && _date != undefined) {
                    var _dateObj = new Date(_date);
                    myObject[key] = _dateObj;
                }
                else {
                    myObject[key] = null;
                }
            }


            else if (attrType == "dropdownInt") {
                myObject[key] = CleanInt($(obj).val());
            }

            else if (attrType == "dropdownText") {
                myObject[key] = $(`#${id} option:selected`).text();
            }
            else if (attrType == "dropdownText2") {
                myObject[key] = $(obj).val();
            }

            else if (attrType == "dropdownText3") {
                myObject[key] = $(obj).val();
            }

            else if (attrType == "decimal") {
                myObject[key] = parseFloat(value).toFixed(2);
            }

            else if (attrType == "checkbox") {
                var _value = $(`#${id}`).is(":checked");
                let _isChecked = (_value == true ? true : false);
                myObject[key] = _isChecked;
            }
        });
    }
    catch (ex) {
        myObject = {}
    }
    finally {
    }
    return myObject;
}


//This method will check if a string is null or empty
function IsNullOrEmpty(value) {
    return (value == null || value == undefined || value == "" || value == " ");
}

//This method will check if a string is null or whitespace
function IsNullOrWhitespace(input) {
    return input === null || /^\s*$/.test(input);
}


//This method will check if a provided email address is valid.
//Please feel free to modify this if there is any check missing.
function IsValidEmail(email) {
    var isValid = true;
    try {
        if (IsNullOrEmpty(email) == false) {
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            isValid = emailPattern.test(email);
        }
        else {
            isValid = false;
        }
    }
    catch (ex) {
        isValid = false;
    }
    return isValid;
}



//This method will validate if an input is valid. such as it does not contain multiple whitespaces
// and it should not be null or empty as well.
function IsValidStringInput(value) {
    try {
        //First check for null or empty
        if (IsNullOrEmpty(value))
            return false;

        // it is possible it is all whitespaces and tabs. so lets replace all the whitespace with single ones
        // and then run a check again for null and emptiness.
        value = value.trim().replace(/\s\s+/g, ' ');
        return !(IsNullOrEmpty(value));
    } catch (ex) {
        return false;
    }
}


//Create a sepeate method for validing name such a name should only contain alphabets.
function IsValidName(value) {
    try {

        if (value == null || value == undefined || value == "" || value == " ")
            return false;

        let isValid = /^[a-zA-Z ]+$/.test(value);
        return isValid;

    } catch (ex) {
        return false;
    }
}


//This method is responsible for parsing string to interger safely after checkign all the undefiend
//null and NaN conditions. instead of writing long ass conditions each time I created a method. :-D
function CleanInt(value) {
    try {
        if (value == undefined || value == null || value == NaN)
            return 0;
        else
            return parseInt(value);
    }
    catch (ex) {
        return 0;
    }
}



//Disable an element or contraby Id
function DisableElement(id) {
    try {
        $(`#${id}`).prop("disabled", true);;
    } catch (ex) {

    }
}


//Enable an element by Id
function EnableElement(id) {
    try {
        $(`#${id}`).removeAttr('disabled');
    } catch (ex) {

    }
}


//This method will disable all the  elements by class name
function DisableElements(className) {
    try {
        $(`.${className}`).each(function (i, obj) {
            $(obj).prop("disabled", true);
        });
    } catch (ex) {

    }
}


//This method will enable all the element by class name
function EnableElements(className) {
    try {
        $(`.${className}`).each(function (i, obj) {
            $(obj).removeAttr("disabled");
        });

    } catch (ex) {

    }
}
