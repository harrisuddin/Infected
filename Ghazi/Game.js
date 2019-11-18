var socket = io();
var name = "Player" + Math.floor(Math.random() * 10000) + 1; // sim unique name
var player = new Player(name, 1200, 100, true, 0, 0);
player.randomizePos(canvas.width - 200, canvas.height - 200);

socket.emit('new player', player);

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

socket.on('drawPlayers', (players) => {
  var playerArray = [];
  for (var id in players) {
    var p = players[id];
    if (p._username != name) {
      playerArray.push(p);
    }
  }
  var animator = new Animator(player, playerArray);
  animator.draw();
});

// send the server the updated player
setInterval( () => {
  socket.emit('updatePlayer', player);
}, 1000 / 60);