class Player {
    
    constructor() {
        
        //this.id = identifier; 
        this.name = "";
        this.isInfected = false; // by default, players are not infected. Players will be randomly chosen to be infected when game begins
        
        // when player is first constructed, set their x, y coordinates to 300, 300.
        this.x = 300;
        this.y = 300;
        
    }
    
    // return the player data in JSON
    toString() {
        // return '{"id":' + this.id + ', ' + '"isInfected":' + this.isInfected + ', ' + '"x":' + this.x + ', ' + '"y":' + this.y + ', ' + '"name":' + this.name + '}';

        return '{"isInfected":' + this.isInfected + ', ' + '"x":' + this.x + ', ' + '"y":' + this.y + ', ' + '"name":' + this.name + '}';
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
}
