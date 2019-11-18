var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
canvas.width = 3840;
canvas.height = 2160;
context.font = "18px Sans-Serif";

keyHandler = new KeyHandler();
document.addEventListener("keydown", (event) => {
    keyHandler.keyDownHandler(event);
}, false);
document.addEventListener("keyup", (event) => {
    keyHandler.keyUpHandler(event);
}, false);

class Animator {
    constructor(player, AI) {
        this._player = player;
        this._AI = AI;
    }

    draw() {
        this.rotate();
        this.animate();

        context.fillText(this._player.username, this._player.xPosition - 5, this._player.yPosition - 25);

        this.drawScore();
        this.drawAI();
    }

    animate() {
        if (keyHandler.upPressed && this._player.yPosition > 0) {
            this._player.yPosition -= this._player.speed;
            this._player.rotation = 0;
            if (keyHandler.rightPressed && this._player.xPosition < canvas.width - this._player.image.width - 60) {
                this._player.xPosition += this._player.speed;
                //this._player.rotation = 45;
                this._player.rotation = 90;
            } else if (keyHandler.leftPressed && this._player.xPosition > 0) {
                this._player.xPosition -= this._player.speed;
                //this._player.rotation = 315;
                this._player.rotation = 270;
            }
        } else if (keyHandler.rightPressed && this._player.xPosition < canvas.width - this._player.image.width - 60) {
            this._player.xPosition += this._player.speed;
            this._player.rotation = 90;
            if (keyHandler.downPressed && this._player.yPosition < canvas.height - this._player.image.height - 60) {
                this._player.yPosition += this._player.speed;
                //this._player.rotation = 135;
                this._player.rotation = 90;
            }
        } else if (keyHandler.downPressed && this._player.yPosition < canvas.height - this._player.image.height - 60) {
            this._player.yPosition += this._player.speed;
            this._player.rotation = 180;
            if (keyHandler.leftPressed && this._player.xPosition > 0) {
                this._player.xPosition -= this._player.speed;
                //this._player.rotation = 225;
                this._player.rotation = 270;
            }
        } else if (keyHandler.leftPressed && this._player.xPosition > 0) {
            this._player.xPosition -= this._player.speed;
            this._player.rotation = 270;
        }

        this._player.setImage();
    }

    drawScore() {
        document.getElementById("score").innerHTML = "SCORE: " + this._player.score;
    }

    drawAI() {
        context.save();
        this._AI.forEach(elem => {
            var AIElement = new Player(elem._username, elem._xPosition, elem._yPosition, elem._isInfected, elem._rotation, elem._score);
            //for (var elem in this._AI) {
            //var AIElement = new Player(elem._username, elem._xPosition, elem._yPosition, elem._isInfected);
            //context.rotate(AIElement.rotation * Math.PI / 180);
            context.drawImage(AIElement.image, AIElement.xPosition, AIElement.yPosition);

            // if (this._player.rotation == 90 || this._player.rotation == 270) {
            //     if (this._player.xPosition <= AIElement.xPosition + AIElement.image.width - 30 && this._player.xPosition + this._player.image.height >= AIElement.xPosition - 20) {
            //         if (this._player.yPosition <= AIElement.yPosition + AIElement.image.height - 60 && this._player.yPosition + this._player.image.width >= AIElement.yPosition - 60) {
            //             if (!AIElement.isInfected) {
            //                 AIElement.isInfected = true;
            //                 this._player.score += 5;
            //             }

            //         }
            //     }
            // } else {
            //     if (this._player.xPosition <= AIElement.xPosition + AIElement.image.width - 25 && this._player.xPosition + this._player.image.width >= AIElement.xPosition - 25) {
            //         if (this._player.yPosition <= AIElement.yPosition + AIElement.image.height - 55 && this._player.yPosition + this._player.image.height >= AIElement.yPosition - 40) {
            //             if (!AIElement.isInfected) {
            //                 AIElement.isInfected = true;
            //                 this._player.score += 5;
            //             }
            //         }
            //     }
            // }
        });
        context.restore();
    }

    // translate the viewport so that the player in the middle of the screen at all times
    centerPlayer() {
        var transX = (-this._player.xPosition + window.innerWidth / 2) - this._player.image.width;
        var transY = (-this._player.yPosition + window.innerHeight / 2) - this._player.image.height;
        canvas.style.transform = "translate(" + transX + "px" + ", " + transY + "px" + ")";
    }

    rotate() {
        context.save();

        this.centerPlayer();
        context.clearRect(0, 0, canvas.width, canvas.height);

        //context.translate(this._player.xPosition + this._player.image.width, this._player.yPosition + this._player.image.height);
        //context.rotate(this._player.rotation * Math.PI / 180);
        context.drawImage(this._player.image, this._player.xPosition, this._player.yPosition);

        context.restore();
    }
}
