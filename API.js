var express = require('express')
var router = express.Router();
const db = require('./Connection.js');
const uuidv4 = require('uuid/v4');
var forge = require('node-forge');

// Users Routes

// Get all the users in the database
router.get('/users', (req, res) => {
    db.query("SELECT * FROM Users", (err, result, fields) => {
        if (err) {
            res.status(404).json(err); //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        } else {
            res.status(200).json(result);
        }
    });
});

// signup user
router.post('/users/signup', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if (username == null || password == null) {
        res.status(400).json({
            message: "Error, username or password is null"
        });
        return;
    }
    var id = uuidv4(); // generate unique id
    var md = forge.md.sha256.create(); //https://github.com/digitalbazaar/forge/blob/master/README.md#sha256
    md.update(password + id); // hash the password with the id as a salt

    var findUsernameQuery = "SELECT username FROM Users WHERE username = '" + username + "'";
    db.query(findUsernameQuery, (err, result, fields) => {
        if (err) {
            res.status(400).json(err);
        } else {
            console.log(result);
            if (result.length == 0) {
                var insertQuery = "INSERT INTO Users (username, password, id) VALUES ('" + username + "'" + ", " + "'" + md.digest().toHex() + "'" + ", " + "'" + id + "')";
                db.query(insertQuery, (err, result, fields) => {
                    if (err) {
                        res.status(400).json(err);
                    } else {
                        res.status(201).json(result);
                    }
                });
            } else {
                res.status(405).json({
                    message: "Error, user already exists"
                });
            }
        }
    });
});

// Check user username/login combo is correct
router.post('/users/login', (req, res) => {
    var username = req.body.username;
    var password = req.body.password;
    if (username == null || password == null) {
        res.status(400).json({
            message: "Error, username or password is null"
        });
        return;
    }
    var findUserQuery = "SELECT * FROM Users WHERE username = '" + username + "'";
    db.query(findUserQuery, (err, result, fields) => {
        if (err) {
            res.status(400).json(err);
        } else {
            var user = result[0];
            if (user == null || user.id == null || user.username == null || user.password == null) {
                res.status(400).json({
                    message: "Error, username/login combination was incorrect"
                });
                return;
            }
            var md = forge.md.sha256.create();
            md.update(password + user.id); // hash the password from the post request with the stored id
            if (user.username == username && md.digest().toHex() == user.password) {
                res.status(200).json({
                    message: "Success, login user"
                });
            } else {
                res.status(406).json({
                    message: "Error, username/login combination was incorrect"
                });
            }
        }
    });
});

// Get specific user by id in DB
router.get('/users/:id', (req, res) => {
    if (req.params.id == null) {
        res.status(400).json({
            message: "Error, id is null"
        });
        return;
    }

    var findIdQuery = "SELECT username, id FROM Users WHERE id = '" + req.params.id + "'";
    db.query(findIdQuery, (err, result, fields) => {
        if (err) {
            res.status(404).json(err); //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        } else {
            res.status(200).json(result);
        }
    });
});

// Scores Route

// Get all the scores in the database
router.get('/scores', (req, res) => {
    db.query("SELECT * FROM Scores", (err, result, fields) => {
        if (err) {
            res.status(404).json(err); //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        } else {
            res.status(200).json(result);
        }
    });
});

// Add a score to DB
router.post('/scores', (req, res) => {
    var id = req.body.id;
    var score = req.body.score;

    if (id == null || score == null) {
        res.status(400).json({
            message: "Error, id or score is null"
        });
        return;
    }

    var addScoreQuery = "INSERT INTO Scores (userId, score) VALUES ('" + id + "'" + ", " + score + ")";
    db.query(addScoreQuery, (err, result, fields) => {
        if (err) {
            res.status(400).json(err);
        } else {
            res.status(201).json(result);
        }
    });
});

// Get specific score by id in DB
router.get('/scores/:id', (req, res) => {

    if (req.params.id == null) {
        res.status(400).json({
            message: "Error, id is null"
        });
        return;
    }

    var query = "SELECT * FROM Scores WHERE userId = '" + req.params.id + "'";
    db.query(query, (err, result, fields) => {
        if (err) {
            res.status(404).json(err); //https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
        } else {
            res.status(200).json(result);
        }
    });
});

module.exports = router;
