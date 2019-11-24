var socket = io();
const canvasWidth = 3840;
const canvasHeight = 2160;
var gameStarted = false;

function play() {
  socket.emit('new player', username, canvasWidth - 200, canvasHeight - 200);
  socket.on('newGuestName', (name) => {
    username = name;
  });
  gameStarted = true;
  // if the player is not a guest then display their high score
  if (!isGuest) {
    drawHighScore(); // function in Draw.js
  }
}

function formatTime(time) {
  var seconds;
  if (time % 60 < 10) {
    seconds = "0" + time % 60;
  } else {
    seconds = time % 60;
  }
  return Math.floor(time / 60) + ":" + seconds;
}

// Every second, update the game time
socket.on('gameTime', (time) => {
  if (time == 0) {
    endScreen();
  }
  document.getElementById("timer").innerHTML = "TIME REMAINING: " + formatTime(time);
});

keyHandler = new KeyHandler();
document.addEventListener("keydown", (event) => {
  keyHandler.keyDownHandler(event);
}, false);
document.addEventListener("keyup", (event) => {
  keyHandler.keyUpHandler(event);
}, false);

// send the server the pressed keys
setInterval(() => {
  if (gameStarted) {
    socket.emit('updatePlayer', keyHandler);
  }
}, 1000 / 60);
