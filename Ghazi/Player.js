class Player {
    constructor(username, maxX, maxY, isInfected, id) {
        this._username = username;
        this._isInfected = isInfected;
        this._id = id;

        this._xPosition;
        this._yPosition;
        this.randomizePos(maxX, maxY);

        this._score = 0;
        this._rotation = 0;
        this._speed = 5;

        this._image_src;
        this.setImageSource();

        this._width;
        this._height;
        this.setPlayerSize();
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

    get score() {
        return this._score;
    }

    set score(score) {
        this._score = score;
    }

    get width() {
        return this._width;
    }

    set width(width) {
        this._width = width;
    }

    get height() {
        return this._height;
    }

    set height(height) {
        this._height = height;
    }
    
    setImageSource() {

        var src = "../assets/Player";

        if (this._isInfected) {
            src += "I";
        } else {
            src += "NI";
        }

        src += this._rotation + ".png";

        this._image_src = src;
    }

    setPlayerSize() {
        if (this._isInfected) {
            // if the player is facing up or down
            if (this._rotation == 0 || this._rotation == 180) {
                this._width = 75;
                this._height = 100;
            // if the player is facing left or right
            } else {
                this._width = 100;
                this._height = 75;
            }
        } else {
            this._height = 75;
            this._width = 75;
        }
    }

    // randomly set the x and y coordinate of the player to numbers lower than or equal to the given maximum x and y
    randomizePos(maxX, maxY) {
        this._xPosition = Math.floor(Math.random() * maxX) + 1;
        this._yPosition = Math.floor(Math.random() * maxY) + 1;
    }
}

module.exports = Player;