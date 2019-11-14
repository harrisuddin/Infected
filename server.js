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


// add the WebSocket handlers
io.on('connection', function (socket) {});

//Test connection is working
//setInterval(function () {
//    io.sockets.emit('message', 'hi!');
//}, 1000);

var players = {};
io.on('connection', function (socket) {
    socket.on('new player', function () {
        console.log(socket.id);
        players[socket.id] = 0; //temp
    });

    socket.on('player', function (data) {
        // data sends the movement array from game.js
//        var player = players[socket.id] || {};
//        if (data.left) {
//            player.x -= 5;
//        }
//        if (data.up) {
//            player.y -= 5;
//        }
//        if (data.right) {
//            player.x += 5;
//        }
//        if (data.down) {
//            player.y += 5;
//        }
        players[socket.id] = data;
        console.log(players);
    });

    // when a new player connects, store their socket id as a key then instatiate a new player as the value
    //players[socket.id] = new Player();
    //console.log(players[socket.id].toString());
});
