var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "sql2.freesqldatabase.com",
  user: "sql2310973",
  password: "bD5%zW5!"
  database: "sql2310973"
});

connection.connect(function(err) {
 if (err) throw err;
  console.log("Connected!");
  var createUsers = "CREATE TABLE IF NOT EXISTS Users(username VARCHAR(20) PRIMARY KEY, password VARCHAR(256), id VARCHAR(64)) ENGINE=INNODB;"
  var createScores = "CREATE TABLE IF NOT EXISTS Scores(name VARCHAR(20), score INT, FOREIGN KEY(name) REFERENCES Users(username))ENGINE=INNODB;"
  connection.query(createUsers, function (err, result) {
    if (err) throw err;
    console.log("User table created");
  });
  connection.query(createScores, function (err, result) {
    if (err) throw err;
    console.log("Score table created");
  });
});
