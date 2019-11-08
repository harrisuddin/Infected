var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
canvas.height = window.innerHeight - 1;
canvas.width = window.innerWidth - 1;

const keyHandler = new KeyHandler();
document.addEventListener("keydown", (event) => 
{
    keyHandler.keyDownHandler(event);
}, false);
document.addEventListener("keyup", (event) => 
{
    keyHandler.keyUpHandler(event);
}, false);

const player = new Player("Human", 100, 100, false);

console.log(player.username);

player.image.onload = animate;

function animate() 
{
    if (keyHandler.upPressed) 
    {
        player.xPosition += player.speed;
    }
    draw();
    requestAnimationFrame(animate);
}

function draw() 
{
    context.clearRect(0, 0, canvas.width, canvas.height);

    context.drawImage(player.image, player.xPosition, player.yPosition);
}