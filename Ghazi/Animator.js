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

        context.fillText(this._player.username, this._player.xPosition + 40, this._player.yPosition + 45);

        this.drawAI();

        document.getElementById("score").innerHTML = this._player.score;
    }

    animate() {
        if (keyHandler.upPressed && this._player.yPosition > 0) {
            this._player.yPosition -= this._player.speed;
            this._player.rotation = 0;
            if (keyHandler.rightPressed && this._player.xPosition < canvas.width - this._player.image.width - 60) {
                this._player.xPosition += this._player.speed;
                this._player.rotation = 45;
            } else if (keyHandler.leftPressed && this._player.xPosition > 0) {
                this._player.xPosition -= this._player.speed;
                this._player.rotation = 315;
            }
        } else if (keyHandler.rightPressed && this._player.xPosition < canvas.width - this._player.image.width - 60) {
            this._player.xPosition += this._player.speed;
            this._player.rotation = 90;
            if (keyHandler.downPressed && this._player.yPosition < canvas.height - this._player.image.height - 60) {
                this._player.yPosition += this._player.speed;
                this._player.rotation = 135;
            }
        } else if (keyHandler.downPressed && this._player.yPosition < canvas.height - this._player.image.height - 60) {
            this._player.yPosition += this._player.speed;
            this._player.rotation = 180;
            if (keyHandler.leftPressed && this._player.xPosition > 0) {
                this._player.xPosition -= this._player.speed;
                this._player.rotation = 225;
            }
        } else if (keyHandler.leftPressed && this._player.xPosition > 0) {
            this._player.xPosition -= this._player.speed;
            this._player.rotation = 270;
        }
    }

    drawAI() {
        this._AI.forEach(AIElement => {
            context.drawImage(AIElement.image, AIElement.xPosition, AIElement.yPosition);

            if (this._player.rotation == 90 || this._player.rotation == 270) {
                if (this._player.xPosition <= AIElement.xPosition + AIElement.image.width - 30 && this._player.xPosition + this._player.image.height >= AIElement.xPosition - 20) {
                    if (this._player.yPosition <= AIElement.yPosition + AIElement.image.height - 60 && this._player.yPosition + this._player.image.width >= AIElement.yPosition - 60) {
                        if (!AIElement.isInfected) {
                            AIElement.isInfected = true;
                            this._player.incrementScore();
                        }

                    }
                }
            } else {
                if (this._player.xPosition <= AIElement.xPosition + AIElement.image.width - 25 && this._player.xPosition + this._player.image.width >= AIElement.xPosition - 25) {
                    if (this._player.yPosition <= AIElement.yPosition + AIElement.image.height - 55 && this._player.yPosition + this._player.image.height >= AIElement.yPosition - 40) {
                        if (!AIElement.isInfected) {
                            AIElement.isInfected = true;
                            this._player.incrementScore();
                        }
                    }
                }
            }
        });
    }

    centerPlayer() {
        // translate the viewport so that the player in the middle of the screen at all times
        var transX = (-this._player.xPosition + window.innerWidth / 2) - this._player.image.width;
        var transY = (-this._player.yPosition + window.innerHeight / 2) - this._player.image.height;
        canvas.style.transform = "translate(" + transX + "px" + ", " + transY + "px" + ")";
    }

    rotate() {
        context.save();

        this.centerPlayer();
        context.clearRect(0, 0, canvas.width, canvas.height);

        context.translate(this._player.xPosition + this._player.image.width, this._player.yPosition + this._player.image.height);
        context.rotate(this._player.rotation * Math.PI / 180);
        context.drawImage(this._player.image, -(this._player.image.width / 2), -(this._player.image.height / 2));

        context.restore();
    }
}
