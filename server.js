// Dependencies
const express = require('express');
var path = require('path');
const app = express();

// allows the app to use any necessary folders
app.use('/front-end', express.static(__dirname + '/front-end'));
app.use('/static', express.static(__dirname + '/static'));
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/game', express.static(__dirname + '/game'));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'));
});

var port = process.env.PORT || 80;

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
