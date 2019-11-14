var mysql = require('mysql');

class Database {

  constructor(host, user, password, database) {

    this._host = host;
    this._user = user;
    this._password = password;
    this._database = database;
    this._connection = mysql.createConnection({ host: host, user: user, password: password, database: database });
  }

  runQuery(query) {

    this._connection.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      connection.query(query, function (err, result) {
        if (err) throw err;
        console.log("Query Success");
      });
    });

  }

// connection.connect(function(err) {
//  if (err) throw err;
//   console.log("Connected!");
//   var createUsers = "CREATE TABLE IF NOT EXISTS Users(username VARCHAR(20) PRIMARY KEY, password VARCHAR(256), id VARCHAR(64)) ENGINE=INNODB;"
//   var createScores = "CREATE TABLE Scores(name VARCHAR(20), score INT, FOREIGN KEY(name) REFERENCES Users(username))ENGINE=INNODB;"
//   connection.query(createUsers, function (err, result) {
//     if (err) throw err;
//     console.log("User table created");
//   });
//   connection.query(createScores, function (err, result) {
//     if (err) throw err;
//     console.log("Score table created");
//   });
// });
