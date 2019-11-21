class Password {

    static isValid(str) {
        if (str.length < 8) {
            return "Error, password is less than 8 characters.";
        } else if (!containsNumber(str)) {
            return "Error, password does not have a number.";
        } else if (!containsUpperCase(str)) {
            return "Error, password does not have a capital letter.";
        } else if (!containsLowerCase(str)) {
            return "Error, password does not have a lower case letter.";
        } else {
            return true;
        }
    }
}

// implement functions to check certain conditions here

// return true if s contains a number
function containsNumber(s) {
    return s.match(/[1-9]/);
}

// return true if s contains a capital letter
function containsUpperCase(s) {
    return s != s.toLowerCase();
}

// return true if s contains a lower case
function containsLowerCase(s) {
    return s != s.toUpperCase();
}
