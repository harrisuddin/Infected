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
  var specialCharacters = "<>@!#$%^&*()_+[]{}?:;|'\"\\,./~`-=";
  for(i=0;i<s.length;i++){
    if(string.indexOf(specialCharacters[i])>-1){
      return true;
    }
  }
  return false;
}

// return true if s contains a number
function containsNumber(s) {
  if(s.includes("0")){
    return true;
  } else if(s.includes("1")){
    return true;
  } else if(s.includes("2")){
    return true;
  } else if(s.includes("3")){
    return true;
  } else if(s.includes("4")){
    return true;
  } else if(s.includes("5")){
    return true;
  } else if(s.includes("6")){
    return true;
  } else if(s.includes("7")){
    return true;
  } else if(s.includes("8")){
    return true;
  } else if(s.includes("9")){
    return true;
  } else {
    return false;
  }
}

// return true if s contains a capital letter
function containsUpperCase(s) {
  return str == str.toUpperCase() && str != str.toLowerCase();
}

// return true if s contains a lower case
function containsLowerCase(s) {
  return str == str.toLowerCase() && str != str.toUpperCase();
}

// export the class for use elsewhere
module.exports = Password;
