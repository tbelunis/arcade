"use strict";

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;

    // Convert a row in the grid to a y-coordinate
    this.rowToYMultiplier = 75;

    // Maximum speed for an enemy
    this.maxSpeed = 450;

    // Set the y-position of the enemy to be in one of the three
    // rows of stones.
    this.y = Math.floor(Math.random() * 3 + 1) * this.rowToYMultiplier;

    // Give the enemy a random speed
    this.speed = Math.floor(Math.random() * this.maxSpeed + 1);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    this.x += this.speed * dt;

    // if the x position is large than the canvas width
    // set the x position to 0
    if (this.x > ctx.canvas.width) {
        this.x = 0;
    }

    // Check to see if the enemy collides with the player.
    // If it does, the player goes back to the start position.
    if (this.collidesWith(player)) {
        player.reset();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Determine whether the enemy has collided with the player.
// A collision occurs when the enemy and the player are in the
// same row and column in the grid.

Enemy.prototype.collidesWith = function(player) {
    var colWidth = 101;
    var rowHeight = 101;

    var col = Math.floor(this.x/colWidth);
    var row = Math.floor(this.y/rowHeight) + 1;

    if (col == player.col && row == player.row) {
        return true;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';

    // Starting position is row 5, column 2 of the
    // game grid.
    this.startCol = 2;
    this.startRow = 5;
    this.col = this.startCol;
    this.row = this.startRow;

    // Constant values to convert row, column to x, y
    // Values based on the values in engine.js for
    // drawing the grid
    this.columnToXMultiplier = 101;
    this.rowToYMultiplier = 83;

    // Convert the columns and rows to xy coordinates
    this.x = this.col * this.columnToXMultiplier;
    this.y = this.row * this.rowToYMultiplier;
};

// Draw the player image at the x, y coordinates
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Update the player's x and y values based on the row and
// column where the player is located
Player.prototype.update = function() {
    this.x = this.col * this.columnToXMultiplier;
    this.y = this.row * this.rowToYMultiplier;
};

// Move the player back to it's starting position
Player.prototype.reset = function() {
    this.col = this.startCol;
    this.row = this.startRow;
};

// Move the player according to the direction given
// from the key press. Make sure that the player does
// not move off the screen.
Player.prototype.handleInput = function(direction) {
    switch (direction) {
        case 'left':
            this.col -= 1;
            if (this.col < 0) {
                this.col = 0;
            }
            break;
        case 'up':
            this.row -= 1;
            if (this.row < 0) {
                this.row = 5;
            }
            break;
        case 'right':
            this.col += 1;
            if (this.col > 4) {
                this.col = 4;
            }
            break;
        case 'down':
            this.row += 1;
            if (this.row > 5) {
                this.row = 5;
            }
            break;
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var enemy1 = new Enemy();
var enemy2 = new Enemy();
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
