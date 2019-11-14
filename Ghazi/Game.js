// This is the time of the game in seconds.
var currentTime = 120;
var socket = io();

const player = new Player("Infected", 1200, 100, true);

socket.emit('new player');

const AI = [];
AI[0] = new Player("Human1", 300, 700, false);
AI[1] = new Player("Human2", 600, 500, false);
AI[2] = new Player("Human4", 1000, 300, false);
AI[3] = new Player("Human3", 1200, 900, false);

const animator = new Animator(player, AI);

window.onload = gameRun;

setInterval(gameTimer, 1000);

console.log(player);

function gameRun() 
{
    animator.draw();
    requestAnimationFrame(gameRun);
}

function gameTimer() 
{
    currentTime--;
    document.getElementById("timer").innerHTML = "TIME REMAINING: " + Math.floor(currentTime / 60) + ":" + currentTime % 60;
}

setInterval(function () {
    socket.emit('player', player);
}, 1000);


//Test connection is working
//socket.on('message', function (data) {
//    console.log(data);
//});



