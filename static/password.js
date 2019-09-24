class Password {

    constructor(str) {
        this.password = str;
    }

    isValid() {
        if (containsSpecial(this.password)) {
            return "Error, password shouldn't contain special characters";
        } else if (this.password.length < 8) {
            return "Error, password is less than 8 characters";
        } else if (!containsNumber(this.password)) {
            return "Error, password does not have a number";
        } else if (!containsUpperCase(this.password)) {
            return "Error, password does not have a capital letter";
        } else if (!containsLowerCase(this.password)) {
            return "Error, password does not have a lower case letter";
        } else {
            return true;
        }
    }
}

// implement functions to check certain conditions here

// return true if s contains a special character
function containsSpecial(s) {

}

// return true if s contains a number
function containsNumber(s) {

}

// return true if s contains a capital letter
function containsUpperCase(s) {

}

// return true if s contains a lower case
function containsLowerCase(s) {

}

// export the class for use elsewhere
module.exports = Password;
