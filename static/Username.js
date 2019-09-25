class Username {

    constructor(string) { //ceats a contructor with type string
        this.Username = string;
    }

    isValid() {
        if (this.Username.length > 20) { //an error message will apear to the player if the user name is longer than 20 characters.
            return "Username cant be bigger than 20 characters long, please try again.";
        }  esle if(this.Username.length < 1) { //a error message will apear to the player if the user name is smaller than 1 characters.
           return "Username cant be smaller than 1 characters long, please try again.";
        }
            return true;
        }
    }
}


// exports the class to a differnt location
module.exports = Username;
