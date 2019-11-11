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

const player = new Player("Infected", 100, 100, true);

const player2 = new Player("Human", 700, 700, false);

console.log(player.username);

player.image.onload = animate;
player2.image.onload = animate;

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

function draw() 
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.save();

    context.translate(player.xPosition + player.image.width, player.yPosition + player.image.height);
    context.rotate(player.rotation * Math.PI / 180);
    context.drawImage(player.image, -(player.image.width / 2), -(player.image.height / 2));

    context.restore();

    context.fillText(player.username, player.xPosition + 35, player.yPosition + 35);
    context.drawImage(player2.image, player2.xPosition, player2.yPosition);
}