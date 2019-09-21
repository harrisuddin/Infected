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
    
    getIsInfected() {
        return this.isInfected;
    }
    
    setIsInfected(a) {
        this.isInfected = a;
    }
    
    getX() {
        return this.x;
    }
    
    setX(a) {
        this.x = a
    }
    
    getY() {
        return this.y;
    }
    
    setY(a) {
        this.y = a;
    }
    
    getName() {
        return this.name;
    }
    
    setName(a) {
        this.name = a;
    }
}
