// Dependencies
require('dotenv/config');
const express = require('express');
var apiRoute = require('./API');
const uuidv4 = require('uuid/v4');
const Player = require('./Ghazi/Player.js');
const bodyParser = require('body-parser');
var http = require('http');
/* socket.io allows communication between
the client and server bidirectionally
(from server to client and client to server)
*/
const socketIO = require('socket.io');
var path = require('path');
const app = express();
var server = http.Server(app);
var io = socketIO(server);

app.use(bodyParser.json());

// Use this route if an an api request comes
app.use('/api', apiRoute);

// allows the app to use any necessary folders
app.use('/front-end', express.static(__dirname + '/front-end'));
app.use('/sql', express.static(__dirname + '/sql'));
app.use('/static', express.static(__dirname + '/static'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/game', express.static(__dirname + '/game'));
app.use('/Ghazi', express.static(__dirname + '/Ghazi'));

// load the game page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/Ghazi/index.html'));
});

var port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

/* ------------------------- GAME LOGIC --------------------------------- */

var players = [];
var infectedCount = 0;
var gameTime = 121;

function getPlayerIndex(arr, id) {
    for (var i = 0, length = arr.length; i < length; i++) {
        if (arr[i]._id == id) return i;
    }
    return -1; // if not found return -1
}

io.on('connection', (socket) => {
    // initalize a new player object
    socket.on('new player', (name, maxX, maxY) => {
        if (name === null) {
            name = "Guest" + uuidv4().substring(0, 5); // the name is guest + the first 5 characters of the unique id
            socket.emit('newGuestName', name);
        }
        var infected;
        if (infectedCount == 0) {
            infected = true;
            infectedCount++;
        } else if (infectedCount > 0) {
            infected = false;
        }
        players.push(new Player(name, maxX, maxY, infected, socket.id));
        //players[socket.id].randomizePos(maxX, maxY);
        console.log(players);
    });

    socket.on('updatePlayer', (keyHandler) => {

        var index = getPlayerIndex(players, socket.id);
        //console.log(index);

        // update the players position and rotation
        if (keyHandler._upPressed && players[index].yPosition > 0) {
            players[index].yPosition -= players[index].speed;
            players[index].rotation = 0;
            if (keyHandler._rightPressed && players[index].xPosition < 3840 - 75 - 60) {
                players[index].xPosition += players[index].speed;
                //players[socket.id].rotation = 45;
                players[index].rotation = 90;
            } else if (keyHandler._leftPressed && players[index].xPosition > 0) {
                players[index].xPosition -= players[index].speed;
                //players[index].rotation = 315;
                players[index].rotation = 270;
            }
        } else if (keyHandler._rightPressed && players[index].xPosition < 3840 - 75 - 60) {
            players[index].xPosition += players[index].speed;
            players[index].rotation = 90;
            if (keyHandler._downPressed && players[index].yPosition < 2160 - 75 - 60) {
                players[index].yPosition += players[index].speed;
                //players[index].rotation = 135;
                players[index].rotation = 90;
            }
        } else if (keyHandler._downPressed && players[index].yPosition < 2160 - 75 - 60) {
            players[index].yPosition += players[index].speed;
            players[index].rotation = 180;
            if (keyHandler._leftPressed && players[index].xPosition > 0) {
                players[index].xPosition -= players[index].speed;
                //players[index].rotation = 225;
                players[index].rotation = 270;
            }
        } else if (keyHandler._leftPressed && players[index].xPosition > 0) {
            players[index].xPosition -= players[index].speed;
            players[index].rotation = 270;
        }

        // then update the image source
        players[index].setImageSource();
        // and update the player width/height
        players[index].setPlayerSize();

        // check for collisions
        var sortedPlayers = players; // make copy of players
        if (players.length > 1) {
            sortedPlayers.sort((a, b) => {
                return a._xPosition - b._xPosition; // sort from lowest to highest xPosition
            });

            for (var i = 1, length = sortedPlayers.length; i < length; i++) {
                player = sortedPlayers[i-1];
                player2 = sortedPlayers[i];
                if (player.xPosition < player2.xPosition + player2.width &&
                    player.xPosition + player.width > player2.xPosition &&
                    player.yPosition < player2.yPosition + player2.height &&
                    player.yPosition + player.height > player2.yPosition) {
                    if (player.isInfected || player2.isInfected) {
                        if (player.isInfected && !player2.isInfected) {
                            player2.isInfected = true;
                            player.score += 5;
                        }
                        if (!player.isInfected && player2.isInfected) {
                            player.isInfected = true;
                            player2.score += 5;
                        }
                        infectedCount = infectedCount + 1;
                    }
                }
            }
        }        

        // then update the image source
        players[index].setImageSource();
        // and update the player width/height
        players[index].setPlayerSize();
    });

    socket.on('disconnect', (reason) => {
        // if the client disconnects then delete them from the game

        var index = getPlayerIndex(players, socket.id);

        if (index != -1) {
            if (players[index].isInfected) {
                infectedCount = infectedCount - 1;
            }
            players.splice(index, 1);
        }
        // reset the game time if everyone leaves
        if (players.length == 0) {
            gameTime = 121;
        }
    });
});

// tell each client to draw all players at 60fps
setInterval(() => {
    if (players.length > 0) {
        io.sockets.emit('drawPlayers', players);
    }
}, 1000 / 60);

// This is the game time counter
setInterval(() => {
    if (players.length > 0) {
        if (gameTime > 0) {
            gameTime--;
        }
        console.log(gameTime);
    }
    io.sockets.emit('gameTime', gameTime);
}, 1000);