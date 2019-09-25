var chai = require('chai');
const Username = require('../static/username.js');
var assert = chai.assert;

describe('Username', function() {

    it('should return an error message if username is bigger than 20 characters', function() {
        var name = new Username("thisgameisgoingtobethebestgame");
        assert.equal(name.isValid(), "Username cant be bigger than 20 characters long, please try again.");
    });
    
    it('should return an error message if username is smaller than 1 characters', function() {
        var name = new Username("");
        assert.equal(name.isValid(), "Username cant be smaller than 1 characters long, please try again.");
    });

    it('should return true if username is valid', function() {
        var name = new Username("Aaron");
        assert.equal(name.isValid(), true);
    });

});
