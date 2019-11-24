class KeyHandler 
{
    constructor() 
    {
        this._upPressed = false;
        this._downPressed = false;
        this._rightPressed = false;
        this._leftPressed = false;

        this._touchX;
        this._touchY
    }

    get upPressed() 
    {
        return this._upPressed;
    }

    get rightPressed() 
    {
        return this._rightPressed;
    }

    get downPressed() 
    {
        return this._downPressed;
    }

    get leftPressed() 
    {
        return this._leftPressed;
    }

    keyDownHandler(e) 
    {
        if (e.key == "Up" || e.key == "ArrowUp") 
        {
            this._upPressed = true;
        }
        else if (e.key == "Right" || e.key == "ArrowRight") 
        {
            this._rightPressed = true;
        }
        else if (e.key == "Down" || e.key == "ArrowDown") 
        {
            this._downPressed = true;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") 
        {
            this._leftPressed = true;
        }
        else if (e.key == "s" || e.key == "KeyS") 
        {
            document.getElementById("scoreTable").style.display = "block";
        }
    }

    keyUpHandler(e) 
    {
        if (e.key == "Up" || e.key == "ArrowUp") 
        {
            this._upPressed = false;
        }
        else if (e.key == "Right" || e.key == "ArrowRight") 
        {
            this._rightPressed = false;
        }
        else if (e.key == "Down" || e.key == "ArrowDown") 
        {
            this._downPressed = false;
        }
        else if (e.key == "Left" || e.key == "ArrowLeft") 
        {
            this._leftPressed = false;
        } 
        else if (e.key == "s" || e.key == "KeyS") 
        {
            document.getElementById("scoreTable").style.display = "none";
        }
    }

    touchHandler(e) 
    {
        if (e.type == "touchstart" || e.type == "touchmove") 
        {
            this._touchX = e.touches[0].clientX;
            this._touchY = e.touches[0].clientY;

            if (this._touchX > window.innerWidth / 2 + window.innerWidth / 8) 
            {
                if (this._touchY > window.innerHeight / 2 + window.innerHeight / 8) 
                {
                    this._rightPressed = true;
                    this._downPressed = true;
                }
                if (this._touchY < window.innerHeight / 2 + window.innerHeight / 8) 
                {
                    this._rightPressed = true;
                    this._downPressed = true;
                }
                else  
                {
                    this._rightPressed = true;
                }
            }
            if (this._touchX < window.innerWidth / 2 + window.innerWidth / 8) 
            {
                
            }
            else 
            {

            }
        }
        else if (e.type == "touchend" || e.type == "touchcancel")
        {
            this._upPressed = false;
            this._rightPressed = false;
            this._downPressed = false;
            this._leftPressed = false;
        }
    }
}