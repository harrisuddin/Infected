// Dependencies
const express = require('express');
const db = require('./sql/db.js');

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
    // when a new player joins the game
    socket.on('new player', (player) => {
        //make sure client can't cheat and increase their score at start
        // var x = Math.floor(Math.random() * 3640) + 1;
        // var y = Math.floor(Math.random() * 1960) + 1;
        // var infected;
        // if (infectedCount == 0) {
        //     infected = true;
        //     infectedCount++;
        // } else if (infectedCount > 0) {
        //     infected = false;
        // }
        // // player._xPosition = x;
        // // player._yPosition = y;
        // // player._score = 0;
        // var player = {
        //     _username: name,
        //     _xPosition: x,
        //     _yPosition: y,
        //     _isInfected: infected,
        //     _rotation: 0,
        //     _score: 0
        // }
        //socket.emit('validatePlayer', player);
        // add player to the players object
        players[socket.id] = player
        console.log(players);
    });

    socket.on('updatePlayer', (player) => {
        // get the updated player from the client
        players[socket.id] = player
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
