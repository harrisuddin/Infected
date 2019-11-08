class KeyHandler 
{
    constructor() 
    {
        this._upPressed = false;
        this._downPressed = false;
        this._rightPressed = false;
        this._leftPressed = false;
    }

    get upPressed() 
    {
        return this._upPressed;
    }

    set upPressed(upPressed) 
    {
        this._upPressed = upPressed;
    }

    get downPressed() 
    {
        return this._downPressed;
    }

    get rightPressed() 
    {
        return this._rightPressed;
    }

    get leftPressed() 
    {
        return this._leftPressed;
    }

    keyDownHandler(e) 
    {
        if(e.key == "Up" || e.key == "ArrowUp") 
        {
            this._upPressed = true;
        }
        else if(e.key == "Down" || e.key == "ArrowDown") 
        {
            this._downPressed = true;
        }
        else if(e.key == "Right" || e.key == "ArrowRight") 
        {
            this._rightPressed = true;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") 
        {
            this._leftPressed = true;
        }
    }

    keyUpHandler(e) 
    {
        if(e.key == "Up" || e.key == "ArrowUp") 
        {
            this._upPressed = false;
        }
        else if(e.key == "Down" || e.key == "ArrowDown") 
        {
            this._downPressed = false;
        }
        else if(e.key == "Right" || e.key == "ArrowRight") 
        {
            this._rightPressed = false;
        }
        else if(e.key == "Left" || e.key == "ArrowLeft") 
        {
            this._leftPressed = false;
        }
    }
}