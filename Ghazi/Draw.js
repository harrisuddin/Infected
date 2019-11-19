var canvas = document.getElementById("gameCanvas");
var context = canvas.getContext("2d");
canvas.width = canvasWidth
canvas.height = canvasHeight;
context.font = "18px Sans-Serif";

socket.on('drawPlayers', (players) => {
    context.save();
    context.clearRect(0, 0, canvas.width, canvas.height);
    for (var id in players) {
      var p = players[id];
      if (p._username === Username) {
        drawThisPlayer(p);
      } else {
        drawOther(p);
      }
    }
    context.restore();
  });

function getPlayerImage(imgSrc) {
    //console.log(imgSrc);
    var img = new Image();
    img.src = imgSrc;
    return img;
  }
  
  function drawPlayer(playerImage, x, y) {
    context.drawImage(playerImage, x, y);
  }
  
  function drawUsername(name, x, y) {
    context.fillText(name, x, y - 25);
  }
  
  function drawScore(score) {
    document.getElementById("score").innerHTML = "SCORE: " + score;
  }
  
  // translate the screen so that the player is in the center of the screen
  function centerScreen(player, img) {
    var transX = (-player._xPosition + window.innerWidth / 2) - (img.width / 2);
    var transY = (-player._yPosition + window.innerHeight / 2) - (img.height / 2);
    canvas.style.transform = "translate(" + transX + "px" + ", " + transY + "px" + ")";
  }
  
  function drawThisPlayer(thisPlayer) {
    var thisPlayerImage = getPlayerImage(thisPlayer._image_src);
    drawUsername(thisPlayer._username, thisPlayer._xPosition, thisPlayer._yPosition);
    centerScreen(thisPlayer, thisPlayerImage);
    drawPlayer(thisPlayerImage, thisPlayer._xPosition, thisPlayer._yPosition);
    drawScore(thisPlayer._score);
  }
  
  function drawOther(other) {
    var otherImage = getPlayerImage(other._image_src);
    drawUsername(other._username, other._xPosition, other._yPosition);
    drawPlayer(otherImage, other._xPosition, other._yPosition);
  }