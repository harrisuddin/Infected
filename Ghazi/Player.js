const playerNotInfected = new Image();
playerNotInfected.src = "../assets/PlayerNI.png";

const playerInfected = new Image();
playerInfected.src = "../assets/PlayerI.png";

class Player 
{
    constructor(username, xPosition, yPosition, isInfected) 
    {
        this._username = username;
        this._xPosition = xPosition;
        this._yPosition = yPosition;
        this._isInfected = isInfected;

        this._score = 0;
        this._rotation = 0;
        this._speed = 5;

        this._image;

        this.setImage();
    }

    get username() 
    {
        return this._username;
    }

    set username(username) 
    {
        this._username = username;
    }
    
    get xPosition() 
    {
        return this._xPosition;
    }

    set xPosition(xPosition) 
    {
        this._xPosition = xPosition;
    }

    get yPosition() 
    {
        return this._yPosition;
    }

    set yPosition(yPosition) 
    {
        this._yPosition = yPosition;
    }

    get isInfected() 
    {
        return this._isInfected;
    }

    set isInfected(isInfected) 
    {
        this._isInfected = isInfected;
        this.setImage();
    }

    get rotation() 
    {
        return this._rotation;
    }

    set rotation(rotation) 
    {
        this._rotation = rotation;
    }

    get speed() 
    {
        return this._speed;
    }

    set speed(speed) 
    {
        this._speed = speed;
    }

    get image()
    {
        return this._image;
    }

    get score()
    {
        return this._score;
    }

    set score(score) 
    {
        this._score = score;
    }

    setImage() 
    {
        if (this._isInfected) 
        {
            this._image = playerInfected;
        }
        else 
        {
            this._image = playerNotInfected;
        }
    }
}
