var chai = require('chai');
const Password = require('../static/password.js');
var assert = chai.assert;

describe('Password', function() {

    it('should return an error message if password contains special characters', function() {
        var pwd = new Password("Jane12345&*");
        assert.equal(pwd.isValid(), "Error, password shouldn't contain special characters");
    });

    it('should return an error message if password is less than 8 characters', function() {
        var pwd = new Password("Jane123");
        assert.equal(pwd.isValid(), "Error, password is less than 8 characters");
    });

    it('should return an error message if password does not have a number', function() {
        var pwd = new Password("ABCDEFgHI");
        assert.equal(pwd.isValid(), "Error, password does not have a number");
    });

    it('should return an error message if password does not have a capital letter', function() {
        var pwd = new Password("1abcdefghi");
        assert.equal(pwd.isValid(), "Error, password does not have a capital letter");
    });

    it('should return an error message if password does not have a lower case letter', function() {
        var pwd = new Password("1ABCDEFGHI");
        assert.equal(pwd.isValid(), "Error, password does not have a lower case letter");
    });

    it('should return true if password is valid', function() {
        var pwd = new Password("JackJack12");
        assert.equal(pwd.isValid(), true);
    });

});
