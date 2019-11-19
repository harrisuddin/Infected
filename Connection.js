var mysql = require('mysql');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Create all the necessary tables the game needs if they don't exist
connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to DB");
    var createUsers = "CREATE TABLE IF NOT EXISTS Users(username VARCHAR(20), password VARCHAR(256), id VARCHAR(64) PRIMARY KEY) ENGINE=INNODB;"
    var createScores = "CREATE TABLE IF NOT EXISTS Scores(userId VARCHAR(64), score INT, FOREIGN KEY(userId) REFERENCES Users(id)) ENGINE=INNODB;"
    connection.query(createUsers, (err, result) => {
        if (err) throw err;
        console.log("User table exists/created");
    });

    connection.query(createScores, (err, result) => {
        if (err) throw err;
        console.log("Score table exists/created");
    });
});

// Export the connection to API.js
module.exports = connection;
