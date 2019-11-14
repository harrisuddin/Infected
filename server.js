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

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

// temporary to test db connection
app.get('/db', (req, res) => {
   db.connect(function (err) {
       if (err) throw err;
       console.log("Connected!");
   });
});

var port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
