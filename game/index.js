// Globals
var x = 10;
var y = 10;
var playerMovement = {
    up: false,
    down: false,
    left: false,
    right: false
}

function play() {
    setInterval(function () {
        update();
    }, (1000 / 60));
}

function update() {
    console.log(x + " " + y);
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 65: // A
                playerMovement.left = true;
                //x -= 5;
                break;
            case 87: // W
                playerMovement.up = true;
                //y -= 5;
                break;
            case 68: // D
                playerMovement.right = true;
                //x += 5;
                break;
            case 83: // S
                playerMovement.down = true;
                //y += 5;
                break;
        }
    });
    document.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 65: // A
                playerMovement.left = false;
                break;
            case 87: // W
                playerMovement.up = false;
                break;
            case 68: // D
                playerMovement.right = false;
                break;
            case 83: // S
                playerMovement.down = false;
                break;
        }
    });

    if (playerMovement.left) {
        x -= 5;
    }
    if (playerMovement.up) {
        y -= 5;
    }
    if (playerMovement.right) {
        x += 5;
    }
    if (playerMovement.down) {
        y += 5;
    }
    drawPlayer(x, y);
}

function drawPlayer(x, y) {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, 300, 300);
    var img = document.getElementById("playerI");
    ctx.drawImage(img, x, y, 50, 37.5);
}
