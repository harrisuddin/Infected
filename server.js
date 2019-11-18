// Dependencies
const express = require('express');
const db = require('./sql/db.js');
const Player = require('./Ghazi/Player.js');
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

// allows the app to use any necessary folders
app.use('/front-end', express.static(__dirname + '/front-end'));
app.use('/sql', express.static(__dirname + '/sql'));
app.use('/static', express.static(__dirname + '/static'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/game', express.static(__dirname + '/game'));
app.use('/Ghazi', express.static(__dirname + '/Ghazi'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/Ghazi/index.html'));
});

// temporary to test db connection
app.get('/db', (req, res) => {
    var createUsers = "CREATE TABLE IF NOT EXISTS Users(username VARCHAR(20) PRIMARY KEY, password VARCHAR(256), id VARCHAR(64)) ENGINE=INNODB;"
    var createScores = "CREATE TABLE IF NOT EXISTS Scores(name VARCHAR(20), score INT, FOREIGN KEY(name) REFERENCES Users(username)) ENGINE=INNODB;"
    db.query(createUsers, function (err, result) {
        if (err) throw err;
        console.log("User table created");
    });
    db.query(createScores, function (err, result) {
        if (err) throw err;
        console.log("Score table created");
    });
});

var port = process.env.PORT || 5000;

server.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

var players = {};
var infectedCount = 0;
io.on('connection', (socket) => {
    // initalize a new player object
    socket.on('new player', (name, maxX, maxY) => {
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
        delete players[socket.id];
    });
});

// tell each client to draw all players at 60fps
setInterval(function () {
    io.sockets.emit('drawPlayers', players);
}, 1000 / 60);

// This is the game time counter
var gameTime = 121;
setInterval(function () {
    if (Object.keys(players).length > 0) {
        if (gameTime > 0) {
            gameTime--;
        }
        console.log(gameTime);
    }
    io.sockets.emit('gameTime', gameTime);
}, 1000);