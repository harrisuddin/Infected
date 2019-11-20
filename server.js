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

var players = {};
var infectedCount = 0;
var gameTime = 121;
io.on('connection', (socket) => {
    // initalize a new player object
    socket.on('new player', (name, maxX, maxY) => {
        if (name === null) {
            name = uuidv4().substring(0, 14); // the name if the first 15 characters of the unique id
            socket.emit('newGuestName', name);
        }
        var infected;
        if (infectedCount == 0) {
            infected = true;
            infectedCount++;
        } else if (infectedCount > 0) {
            infected = false;
        }
        players[socket.id] = new Player(name, 0, 0, infected, 0, 0);
        players[socket.id].randomizePos(maxX, maxY);
        console.log(players);
    });

    socket.on('updatePlayer', (keyHandler) => {
        // update the players position and rotation
        if (keyHandler._upPressed && players[socket.id].yPosition > 0) {
            players[socket.id].yPosition -= players[socket.id].speed;
            players[socket.id].rotation = 0;
            if (keyHandler._rightPressed && players[socket.id].xPosition < 3840 - 75 - 60) {
                players[socket.id].xPosition += players[socket.id].speed;
                //players[socket.id].rotation = 45;
                players[socket.id].rotation = 90;
            } else if (keyHandler._leftPressed && players[socket.id].xPosition > 0) {
                players[socket.id].xPosition -= players[socket.id].speed;
                //players[socket.id].rotation = 315;
                players[socket.id].rotation = 270;
            }
        } else if (keyHandler._rightPressed && players[socket.id].xPosition < 3840 - 75 - 60) {
            players[socket.id].xPosition += players[socket.id].speed;
            players[socket.id].rotation = 90;
            if (keyHandler._downPressed && players[socket.id].yPosition < 2160 - 75 - 60) {
                players[socket.id].yPosition += players[socket.id].speed;
                //players[socket.id].rotation = 135;
                players[socket.id].rotation = 90;
            }
        } else if (keyHandler._downPressed && players[socket.id].yPosition < 2160 - 75 - 60) {
            players[socket.id].yPosition += players[socket.id].speed;
            players[socket.id].rotation = 180;
            if (keyHandler._leftPressed && players[socket.id].xPosition > 0) {
                players[socket.id].xPosition -= players[socket.id].speed;
                //players[socket.id].rotation = 225;
                players[socket.id].rotation = 270;
            }
        } else if (keyHandler._leftPressed && players[socket.id].xPosition > 0) {
            players[socket.id].xPosition -= players[socket.id].speed;
            players[socket.id].rotation = 270;
        }

        // then update the image source
        players[socket.id].setImageSource();
    });

    socket.on('disconnect', (reason) => {
        // if the client disconnects then delete them from the game

        if (typeof players[socket.id] !== 'undefined') {
            if (players[socket.id].isInfected) {
                infectedCount--;
            }
            delete players[socket.id];
        }
        // reset the game time if everyone leaves
        if (Object.keys(players).length == 0) {
            gameTime = 121;
        }
    });
});

// tell each client to draw all players at 60fps
setInterval(() => {
    if (players !== {}) {
        io.sockets.emit('drawPlayers', players);
    }
}, 1000 / 60);

// This is the game time counter
setInterval(() => {
    if (Object.keys(players).length > 0) {
        if (gameTime > 0) {
            gameTime--;
        }
        console.log(gameTime);
    }
    io.sockets.emit('gameTime', gameTime);
}, 1000);
