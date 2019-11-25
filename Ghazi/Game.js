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
  } else {
    document.getElementById("highScore").style.display = "none";
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
  if (time < 0) {
    document.getElementById("gameOver").innerHTML = "Game will restart in a few seconds. Please leave if you don't want to play.";
    document.getElementById("gameOver").style.display = "block";
    if (!isGuest && time == -1) {
      sendNewScore();
    }
  } else {
    document.getElementById("gameOver").style.display = "none";
    document.getElementById("timer").innerHTML = "TIME REMAINING: " + formatTime(time);
  }
});

keyHandler = new KeyHandler();
document.addEventListener("keydown", (event) => {
  keyHandler.keyDownHandler(event);
}, false);
document.addEventListener("keyup", (event) => {
  keyHandler.keyUpHandler(event);
}, false);
document.addEventListener("touchstart" || "touchmove", (event) => {
  keyHandler.touchStartHandler(event);
}, false);
document.addEventListener("touchend" || "touchcancel", (event) => {
  keyHandler.touchEndHandler(event);
}, false);

// send the server the pressed keys
setInterval(() => {
  if (gameStarted) {
    socket.emit('updatePlayer', keyHandler);
  }
}, 1000 / 60);

function sendNewScore() {

  var score = document.getElementById("scoreValue").innerHTML;

  var data = {
    "username": username,
    "score": parseInt(score)
  };

$.ajax({
    async: true,
    type: 'POST',
    url: '/api/scores/',
    data: JSON.stringify(data),
    contentType: 'application/json',
    // success: function (result) {
    //     console.log(result);
    // },
    error: function (xhr, status, error) {
        // var errorResponse = xhr.responseJSON;
        // document.getElementById("error").innerHTML += errorResponse.message + "<br>";
        // document.getElementById("error").style.display = "block";
        // loginSignupValid = false;
        console.log(xhr);
    }
});
}