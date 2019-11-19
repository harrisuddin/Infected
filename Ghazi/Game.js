var socket = io();
//var name = "Player" + Math.floor(Math.random() * 10000) + 1; // sim unique name
const canvasWidth = 3840;
const canvasHeight = 2160;
var gameStarted = false;

function play() {
  socket.emit('new player', Username, canvasWidth - 200, canvasHeight - 200);
  socket.on('newGuestName', (name) => {
    Username = name;
  });
  gameStarted = true;
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