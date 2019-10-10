//
// Asset loader, creates an array for images.
//

var ImageLoader = {
    images: {}
};

//
//Loads images, takes a key and source arguement and creates a new image.
//Creates new promise, attempts to load a new image, if image is successfully loaded then continues with function
//else if it doesnt load then it throws an error.
//

ImageLoader.loadImage = function (key, src) {
    var img = new Image();

    var newImg = new Promise(function (resolve, reject) {
        img.onload = function () {
            ImageLoader.images[key] = img;
            resolve(img);
        }
        img.onerror = function () {
            reject('Cannot load image: ' + src);
        };
    });

    img.src = src;
    return newImg;
};

//
//Getter function for the images.
//if image exists, return image, else return null.
//

ImageLoader.getImage = function (key) {
    return (key in this.images) ? this.images[key] : null;
};

//
// Keyboard handler, creates an array for keyboard buttons.
//

var Keyboard = {};

//
//Keyboard bindings for movement; Left:A, Right:D, Up:W, Down:S .
//

Keyboard.MOVELEFT = 65;
Keyboard.MOVERIGHT = 68;
Keyboard.MOVEUP = 87;
Keyboard.MOVEDOWN = 83;

//
//Keyboard array for Keyboard keycodes
//

Keyboard._keys = {};

//
//Keyboard event handler, sets keydown to false for all then listens for a keydown
//if keydown, perform keyaction until keyup.
//isdown returns error if the keycode doesnt exist, else returns the keycode.
//

Keyboard.listenForEvents = function (keys) {
    window.addEventListener('keydown', Keyboard._onKeyDown.bind(this));
    window.addEventListener('keyup', Keyboard._onKeyUp.bind(this));

    keys.forEach(function (key) {
        Keyboard._keys[key] = false;
    });
}

Keyboard._onKeyDown = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in Keyboard._keys) {
        Keyboard._keys[keyCode] = true;
    }
};

Keyboard._onKeyUp = function (event) {
    var keyCode = event.keyCode;
    if (keyCode in this._keys) {
        Keyboard._keys[keyCode] = false;
    }
};

Keyboard.isDown = function (keyCode) {
    if (!keyCode in Keyboard._keys) {
        throw new Error('Keycode ' + keyCode + ' is not being listened to');
    }
    return Keyboard._keys[keyCode];
};

//
// Game object
//

var Game = {};

Game.run = function (context) {
    Game.ctx = context;
    Game._previousElapsed = 0;

    var p = Game.load();
    Promise.all(p).then(function (loaded) {
        Game.display();
        window.requestAnimationFrame(Game.tick);
    });
};

//
//Game tick , how often the screen refreshes for camera movement
//

Game.tick = function (elapsed) {
    window.requestAnimationFrame(Game.tick);

    // clear previous frame
    Game.ctx.clearRect(0, 0, 1024, 1024);

    // compute delta time in seconds -- also cap it
    var delta = (elapsed - Game._previousElapsed) / 1000.0;
    delta = Math.min(delta, 0.25); // maximum delta of 250 ms
    Game._previousElapsed = elapsed;

    Game.update(delta);
    Game.render();
}

//
// start up function
//

window.onload = function () {

    var context = document.getElementById('demo').getContext('2d');
    Game.run(context);
};
