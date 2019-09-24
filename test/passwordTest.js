describe('Password', function() {

    it('should return an error message if password contains special characters', function() {
        var pwd = new Password("Jane12345&*");
        assert.equal(pwd.isValid(), "Error, password shouldn't contain special characters");
    });

    it('should return an error message if password is less than 8 characters', function() {
        var pwd = new Password("Jane123");
        assert.equal(pwd.isValid(), "Error, password is less than 8 characters");
    });



});
