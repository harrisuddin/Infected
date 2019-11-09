// Client side version of the game
// with 2 players on the same PC

// Globals
var player = new Player();
var player2 = new Player();
player2.setX(900); //temporary

var playerMovement = {
    up: false,
    down: false,
    left: false,
    right: false
}

var playerMovement2 = {
    up: false,
    down: false,
    left: false,
    right: false
}

function play() {
    setInterval(function () {
        update();
    }, (1000 / 50));
}

function update() {
    // Test
    console.log(player.getX() + " " + player.getY());
    console.log(player2.getX() + " " + player2.getY());

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

    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case 70: // F
                playerMovement2.left = true;
                break;
            case 84: // T
                playerMovement2.up = true;
                break;
            case 72: // D
                playerMovement2.right = true;
                break;
            case 71: // S
                playerMovement2.down = true;
                break;
        }
    });
    document.addEventListener('keyup', function (event) {
        switch (event.keyCode) {
            case 70: // A
                playerMovement2.left = false;
                break;
            case 84: // W
                playerMovement2.up = false;
                break;
            case 72: // D
                playerMovement2.right = false;
                break;
            case 71: // S
                playerMovement2.down = false;
                break;
        }
    });


    if (playerMovement.left) {
        //x -= 5;
        player.setX(player.getX() - 5);
    }
    if (playerMovement.up) {
        //y -= 5;
        player.setY(player.getY() - 5);
    }
    if (playerMovement.right) {
        //x += 5;
        player.setX(player.getX() + 5);
    }
    if (playerMovement.down) {
        //y += 5;
        player.setY(player.getY() + 5);
    }

    if (playerMovement2.left) {
        //x -= 5;
        player2.setX(player2.getX() - 5);
    }
    if (playerMovement2.up) {
        //y -= 5;
        player2.setY(player2.getY() - 5);
    }
    if (playerMovement2.right) {
        //x += 5;
        player2.setX(player2.getX() + 5);
    }
    if (playerMovement2.down) {
        //y += 5;
        player2.setY(player2.getY() + 5);
    }

    var innerWidth = window.innerWidth;
    var innerHeight = window.innerHeight;
    var translateX = false;
    var translateY = false;

    //console.log("translate(" + (player.getX() - (500 / 2)) + ", " + (player.getY() - (500 / 2)) + ")");

    //    if (player.getX() > 640 && player.getY() > 240) {
    //        document.getElementById("game").style.transform = "translate(" + (-1*(player.getX() - (innerWidth / 2))) + "px" +  ", " + (-1*(player.getY() - (innerHeight / 2))) + "px" + ")";
    //    }

    if (player.getX() > 640 && player.getX() < 3150) {
        translateX = true;
        //        console.log("transforming x");
        //        document.getElementById("game").style.transform = "translateX(" + (-1*(player.getX() - (innerWidth / 2))) + "px" + ")";

    }

    if (player.getY() > 245 && player.getY() < 1900) {
        translateY = true;
        //        console.log("transforming y");
        //        document.getElementById("game").style.transform = "translateY(" + (-1*(player.getY() - (innerHeight / 2))) + "px" + ")";
    }

    if (translateX && translateY) {
        //alert("hi");
        document.getElementById("game").style.transform = "translate(" + (-1 * (player.getX() - (innerWidth / 2))) + "px" + ", " + (-1 * (player.getY() - (innerHeight / 2))) + "px" + ")";
    } else {

        if (translateX) {
            document.getElementById("game").style.transform = "translateX(" + (-1 * (player.getX() - (innerWidth / 2))) + "px" + ")";
        }

        if (translateY) {
            document.getElementById("game").style.transform = "translateY(" + (-1*(player.getY() - (innerHeight / 2))) + "px" + ")";
        }

    }





    $("#player span").text("x: " + player.getX() + ", " + "y: " + player.getY());

    document.getElementById("player").style.left = player.getX() + "px";
    document.getElementById("player").style.top = player.getY() + "px";
    document.getElementById("player").style.transform = "rotate(" + returnPlayerRotation(playerMovement) + 'deg)';

    document.getElementById("player2").style.left = player2.getX() + "px";
    document.getElementById("player2").style.top = player2.getY() + "px";
    document.getElementById("player2").style.transform = "rotate(" + returnPlayerRotation(playerMovement2) + 'deg)';

    if (player.getX() < player2.getX() + player2.getWidth() &&
        player.getX() + player.getWidth() > player2.getX() &&
        player.getY() < player2.getY() + player2.getHeight() &&
        player.getY() + player.getHeight() > player2.getY()) {
        alert("true");
    }
}

function returnPlayerRotation(pm) {

    if (pm.up) {
        if (pm.right || pm.left) {
            // And they are pressing D
            if (pm.right) {
                return 45;
            }
            // And they are pressing A
            if (pm.left) {
                return 315;
            }
        } else {
            return 0;
        }
    }

    if (pm.down) {

        if (pm.right || pm.left) {
            // And they are pressing D
            if (pm.right) {
                return 135;
            }
            // And they are pressing A
            if (pm.left) {
                return 225;
            }
        } else {
            return 180;
        }
    }

    if (pm.left) {
        return 270;
    }

    if (pm.right) {
        return 90;
    }

    return 0;
}
