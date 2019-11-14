// Dependencies
const express = require('express');
const db = require('./sql/db.js');
var path = require('path');
const app = express();

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

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
