var mysql = require('mysql');

var connection = mysql.createConnection({
  host: "sql2.freesqldatabase.com",
  user: "sql2310973",
  password: "bD5%zW5!"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});
