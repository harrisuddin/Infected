class Player {
    constructor(username, xPosition, yPosition, isInfected, rotation, score) {
        this._username = username;
        this._xPosition = xPosition;
        this._yPosition = yPosition;
        this._isInfected = isInfected;

        this._score = score;
        this._rotation = rotation;
        this._speed = 5;

        this._image_src;

        this.setImageSource();
    }

    get username() {
        return this._username;
    }

    set username(username) {
        this._username = username;
    }

    get xPosition() {
        return this._xPosition;
    }

    set xPosition(xPosition) {
        this._xPosition = xPosition;
    }

    get yPosition() {
        return this._yPosition;
    }

    set yPosition(yPosition) {
        this._yPosition = yPosition;
    }

    get isInfected() {
        return this._isInfected;
    }

    set isInfected(isInfected) {
        this._isInfected = isInfected;
        this.setImageSource();
    }

    get rotation() {
        return this._rotation;
    }

    set rotation(rotation) {
        this._rotation = rotation;
    }

    get speed() {
        return this._speed;
    }

    set speed(speed) {
        this._speed = speed;
    }

    get image() {
        return this._image;
    }

    get score() {
        return this._score;
    }

    set score(score) {
        this._score = score;
    }

    setImageSource() {

        //const playerImage = new Image();
        var src = "../assets/Player";

        if (this._isInfected) {
            src += "I";
        } else {
            src += "NI";
        }

        src += this._rotation + ".png";

        this._image_src = src;
    }

    // randomly set the x and y coordinate of the player to numbers lower than or equal to the given maximum x and y
    randomizePos(maxX, maxY) {
        this._xPosition = Math.floor(Math.random() * maxX) + 1;
        this._yPosition = Math.floor(Math.random() * maxY) + 1;
    }
}

module.exports = Player;