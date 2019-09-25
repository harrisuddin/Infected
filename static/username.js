class Username {

    constructor(string) { // creates a constructor with a string parameter
        this.username = string;
    }

    isValid() {
        if (this.username.length > 20) { //an error message will appear to the player if the user name is longer than 20 characters.
            return "Username cant be bigger than 20 characters long, please try again.";
        } else if (this.username.length < 1) { //a error message will apear to the player if the user name is smaller than 1 characters.
            return "Username cant be smaller than 1 characters long, please try again.";
        }
        return true;
    }
}

// exports the class to a differnt location
module.exports = Username;
