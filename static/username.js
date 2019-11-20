class Username {

    static isValid(str) {
        if (str.length > 20) { //an error message will appear to the player if the user name is longer than 20 characters.
            return "Username can't be bigger than 20 characters long, please try again.";
        } else if (str.length < 1) { //a error message will apear to the player if the user name is smaller than 1 characters.
            return "Username can't be smaller than 1 characters long, please try again.";
        }
        return true;
    }
}