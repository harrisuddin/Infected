var context = document.getElementById("myCanvas").getContext("2d");

console.log("hello");

const player = new Player("Human", 100, 100);

console.log(player.username);

player.image.onload = draw;

function draw() 
{
    context.drawImage(player.image, player.xPosition, player.yPosition);
}
