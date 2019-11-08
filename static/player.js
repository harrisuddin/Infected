class Player {
    
    constructor() {
        
        //this.id = identifier; 
        this.name = "";
        this.isInfected = false; // by default, players are not infected. Players will be randomly chosen to be infected when game begins
        
        // when player is first constructed, set their x, y coordinates to 300, 300 and height and width to 75.
        this.x = 300;
        this.y = 300;
        this.height = 75;
        this.width = 75;
    }
    
    // return the player data in JSON
    toString() {
        // return '{"id":' + this.id + ', ' + '"isInfected":' + this.isInfected + ', ' + '"x":' + this.x + ', ' + '"y":' + this.y + ', ' + '"name":' + this.name + '}';

        return '{"isInfected":' + this.isInfected + ', ' + '"x":' + this.x + ', ' + '"y":' + this.y + ', ' + '"name":' + '"' + this.name + '"' + '}';
    }
    
    /* Getters and Setters */
    
    // getID() {
    //     return this.id;
    // }
    
    // setID(a){
    //     this.id = a;
    // }
    
    // returns true if the player is infected
    getIsInfected() {
        return this.isInfected;
    }
    
    // set whether or not the player is infected
    setIsInfected(a) {
        this.isInfected = a;
    }
    
    // get the x coordinate of the player
    getX() {
        return this.x;
    }
    
    // set the x coordinate of the player
    setX(a) {
        this.x = a
    }
    
    // get the y coordinate of the player
    getY() {
        return this.y;
    }
    
    // set the x coordinate of the player
    setY(a) {
        this.y = a;
    }
    
    // get the name of the player
    getName() {
        return this.name;
    }
    
    // set the name of the player
    setName(a) {
        this.name = a;
    }
    
    // set the height of the player
    getHeight() {
    	return this.height;
    }
    
    // get the height of the player
    setHeight(a){
    	this.height = a;
    }
    
    // get the width of the player
    getWidth(){
		return this.width;    
    }
    
    // set the width of the player
    setWidth(a){
   	    this.width = a; 
    }

    // randomly set the x and y coordinate of the player to numbers lower than or equal to the given maximum x and y
    randomizePos(maxX, maxY) {
        this.x = Math.floor(Math.random() * maxX) + 1;
        this.y = Math.floor(Math.random() * maxY) + 1;
    }

}

// export the class for use elsewhere
module.exports = Player;
