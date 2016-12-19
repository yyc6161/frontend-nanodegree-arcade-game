/*
* This function will generate a random number in the range between [min,max), 
* the parameters 'min' and 'max' that it receives must be integers.
*/
var random = function(min,max) {
    var dif = max - min;
    var num = Math.floor(Math.random() * dif) + min;
    return num;
};
// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -101;
    this.y = random(1,4) * 83 - 30;   //this.y is assigned a y-coordinate value of rows 1~3 randomly,
    this.speed = random(4,10) * 30;   //and speed is also randomly generated.
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-princess-girl.png';
    this.originX = 202;
    this.originY = 5 * 83 - 38;      //Set the initial coordinate value
    this.x = this.originX;
    this.y = this.originY;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function() {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    
};

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/*
* When a particular key is pressed, this function gives some response.
*/
Player.prototype.handleInput = function(key) {
    if(key === 'left' && this.x > 0){
        this.x -= 101;
    };
    if(key === 'up') {
        if(this.y > 1*83-38) {
            this.y -= 83;
        } else {                     //When the player to reach the row 1 (that means y = 1*83-38), and press 'up',
            this.x = this.originX;   //the player wins and returns to the initial point.
            this.y = this.originY;
            console.log("You win!");
        };
    };
    if(key === 'right' && this.x < 404) {
        this.x += 101;
    };
    if(key === 'down'  && this.y < 5*83-38) {
        this.y += 83;
    };
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player();

/*
* The function of this function is to detect the number 
* and status of the enemy, and then make some adjustments.
*/
var checkEnemies = function() {
    if(allEnemies.length < 4) {    //If the number of enemies is less than 4, 
        var e = new Enemy;        //more enemies are generated.
        allEnemies.push(e);
    };
    allEnemies.forEach(function(enemy,index) {
        if(enemy.x>505) {                 //When the enemy's position beyond the screen,
            allEnemies.splice(index,1);   //then destroy these enemies.
        };
    });
};

/*
* When the player and the enemy have a certain degree of overlap, 
* it means that the player lost the game, 
* and then the player back to the starting point.
*/
var checkCollisions =function() {
    allEnemies.forEach(function(enemy) {
        if(enemy.x > player.x-75 && enemy.x < player.x+70 && enemy.y === player.y + 8) {
            player.x = player.originX;
            player.y = player.originY;
            console.log("You lose!");
        };
    });
};

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
