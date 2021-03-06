var chai = require('chai');
const Player = require('../static/player.js');
var assert = chai.assert;
var expect = chai.expect;

describe('Player', function () {

    it('name should be empty at start', function () {
        var player = new Player();
        assert.equal(player.getName(), "");
    });

    it('x coordinate should be 300 at start', function () {
        var player = new Player();
        assert.equal(player.getX(), 300);
    });

    it('y coordinate should be 300 at start', function () {
        var player = new Player();
        assert.equal(player.getY(), 300);
    });

    it('isInfected should be false at start', function () {
        var player = new Player();
        assert.equal(player.getIsInfected(), false);
    });

    it('set the name of the player', function () {
        var player = new Player();
        player.setName("Jack");
        assert.equal(player.getName(), "Jack");
    });

    it('set the x coordinate of the player', function () {
        var player = new Player();
        player.setX(228);
        assert.equal(player.getX(), 228);
    });

    it('set the y coordinate of the player', function () {
        var player = new Player();
        player.setY(451);
        assert.equal(player.getY(), 451);
    });

    it('set isInfected to true', function () {
        var player = new Player();
        player.setIsInfected(true);
        assert.equal(player.getIsInfected(), true);
    });

    it('should return the player object in JSON', function () {
        var player = new Player();
        player.setName("John");
        player.setIsInfected("true");
        assert.equal(player.toString(), '{"isInfected":true, "x":300, "y":300, "name":"John"}');
    });

    it('should return the player object with empty name in JSON', function () {
        var player = new Player();
        //player.setName("John");
        player.setIsInfected("true");
        assert.equal(player.toString(), '{"isInfected":true, "x":300, "y":300, "name":""}');
    });



    it('should randomize the x and y coordinate of the player but be lower than or equal the maximum x and y given ', function () {
        var maxX = 100;
        var maxY = 100;
        var player = new Player();

        player.randomizePos(maxX, maxY);
        expect(player.getX() <= maxX).to.be.true;
        expect(player.getY() <= maxY).to.be.true;

        player.setX(400);
        player.setY(400);
        maxX = 800;
        maxY = 800;
        player.randomizePos(maxX, maxY);
        expect(player.getX() <= maxX).to.be.true;
        expect(player.getY() <= maxY).to.be.true;

    });

});
