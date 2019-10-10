// Globals
var player = new Player();
var x = player.getX();
var y = player.getY();
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
var img = document.getElementById("playerI");
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
    // Test
    console.log(x + " " + y);

    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 65: // A
                playerMovement.left = true;
                break;
            case 87: // W
                playerMovement.up = true;
                break;
            case 68: // D
                playerMovement.right = true;
                break;
            case 83: // S
                playerMovement.down = true;
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

    var degree = returnPlayerRotation();
    drawPlayer(img, x, y, 75, 100, degree);
}

function drawPlayer(img, x, y, width, height, deg) {

    // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_animations#Basic_animation_steps

    // Clear the canvas
    ctx.clearRect(0, 0, 700, 700);

    // Store the current context state (i.e. rotation, translation etc..)
    ctx.save()

    // Convert degrees to radian
    var radian = deg * Math.PI / 180;

    // Set the origin to the center of the image
    ctx.translate(x + width / 2, y + height / 2);

    // Rotate the canvas around the origin
    ctx.rotate(radian);

    // Draw the image
    ctx.drawImage(img, width / 2 * (-1), height / 2 * (-1), width, height);

    // Restore canvas state as saved from above
    ctx.restore();
}

// Return the player rotation in degrees
function returnPlayerRotation() {

    if (playerMovement.up) {

        if (playerMovement.right || playerMovement.left) {
            // And they are pressing D
            if (playerMovement.right) {
                return 45;
            }
            // And they are pressing A
            if (playerMovement.left) {
                return 315;
            }
        } else {
            return 0;
        }
    }

    if (playerMovement.down) {

        if (playerMovement.right || playerMovement.left) {
            // And they are pressing D
            if (playerMovement.right) {
                return 135;
            }
            // And they are pressing A
            if (playerMovement.left) {
                return 225;
            }
        } else {
            return 180;
        }
    }

    if (playerMovement.left) {
        return 270;
    }

    if (playerMovement.right) {
        return 90;
    }

    return 0;
}