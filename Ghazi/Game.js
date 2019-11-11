var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
canvas.height = window.innerHeight - 1;
canvas.width = window.innerWidth - 1;

context.font = "18px Sans-Serif";

const keyHandler = new KeyHandler();
document.addEventListener("keydown", (event) => 
{
    keyHandler.keyDownHandler(event);
}, false);
document.addEventListener("keyup", (event) => 
{
    keyHandler.keyUpHandler(event);
}, false);

const player = new Player("Infected", 1200, 100, true);

const AI = [];

AI[0] = new Player("Human1", 300, 700, false);
AI[1] = new Player("Human2", 600, 500, false);
AI[2] = new Player("Human4", 1000, 300, false);
AI[3] = new Player("Human3", 1200, 900, false);

player.image.onload = animate;

function animate() 
{
    if (keyHandler.upPressed && player.yPosition > 0) 
    {
        player.yPosition -= player.speed;
        player.rotation = 0;
        if (keyHandler.rightPressed && player.xPosition < canvas.width - player.image.width - 60) 
        {
            player.xPosition += player.speed;
            player.rotation = 45;
        }
        else if (keyHandler.leftPressed && player.xPosition > 0) 
        {
            player.xPosition -= player.speed;
            player.rotation = 315;
        }
    }
    else if (keyHandler.rightPressed && player.xPosition < canvas.width - player.image.width - 60) 
    {
        player.xPosition += player.speed;
        player.rotation = 90;
        if (keyHandler.downPressed && player.yPosition < canvas.height - player.image.height - 60) 
        {
            player.yPosition += player.speed;
            player.rotation = 135;
        }
    }
    else if (keyHandler.downPressed && player.yPosition < canvas.height - player.image.height - 60) 
    {
        player.yPosition += player.speed;
        player.rotation = 180;
        if (keyHandler.leftPressed && player.xPosition > 0) 
        {
            player.xPosition -= player.speed;
            player.rotation = 225;
        }
    }
    else if (keyHandler.leftPressed && player.xPosition > 0) 
    {
        player.xPosition -= player.speed;
        player.rotation = 270;
    }

    draw();
    requestAnimationFrame(animate);
}

function drawAI() 
{
    AI.forEach(AIElement => {
        context.drawImage(AIElement.image, AIElement.xPosition, AIElement.yPosition);

        if (player.rotation == 90 || player.rotation == 270) 
        {
            if (player.xPosition <= AIElement.xPosition + AIElement.image.width - 30 && player.xPosition + player.image.height >= AIElement.xPosition - 20) 
            {
                if (player.yPosition <= AIElement.yPosition + AIElement.image.height - 60 && player.yPosition + player.image.width >= AIElement.yPosition - 60) 
                {
                    AIElement.isInfected = true;
                }
            }
        }
        else 
        {
            if (player.xPosition <= AIElement.xPosition + AIElement.image.width - 25 && player.xPosition + player.image.width >= AIElement.xPosition - 25) 
            {
                if (player.yPosition <= AIElement.yPosition + AIElement.image.height - 55 && player.yPosition + player.image.height >= AIElement.yPosition - 40) 
                {
                    AIElement.isInfected = true;
                }
            }
        }
    });
}

function rotate() 
{
    context.save();

    context.translate(player.xPosition + player.image.width, player.yPosition + player.image.height);
    context.rotate(player.rotation * Math.PI / 180);
    context.drawImage(player.image, -(player.image.width / 2), -(player.image.height / 2));

    context.restore();
}

function draw() 
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    rotate();

    context.fillText(player.username, player.xPosition + 35, player.yPosition + 35);
    
    drawAI();
}