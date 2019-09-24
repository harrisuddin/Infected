class Password {

    constructor(str) {
        this.password = str;
    }

    isValid() {
        if (containsSpecial(this.password)) {
            // return error
        }
    }
}

// implement functions to check certain conditions here

function containsSpecial(s) {

}






















// export the class for use elsewhere
module.exports = Password;
