const Asteroid = require('./asteroid.js');
const Bullet = require('./bullet.js');
const Ship = require('./ship.js');
const Util = require('./utils.js')

function Game(num_asteroids) {
  this.num_asteroids = num_asteroids;
  this.asteroids = this.addAsteroids();
  this.bullets = [];
  new_ship = new Ship({ pos: this.randomPosition(), game: this });
  this.ships = [new_ship];
  this.createImage();
}

Game.DIM_X = window.innerWidth;
Game.DIM_Y = window.innerHeight;
Game.NUM_ASTEROIDS = this.num_asteroids;

Game.prototype.createImage = function() {
  const img = new Image();
  img.onload = () => {
    this.img = img;
  }
  img.src = 'https://static.pexels.com/photos/107956/pexels-photo-107956.jpeg';
}

Game.prototype.addAsteroids = function() {
  const asteroids = [];
  for (let i = 0; i < this.num_asteroids; i++) {
    const asteroid = new Asteroid({ pos: this.randomPosition(), game: this });
    asteroids.push(asteroid);
  }
  return asteroids;
};

Game.prototype.randomPosition = function() {
  return [Math.random() * Game.DIM_X, Math.random() * Game.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
  ctx.drawImage(this.img, 0, 0, Game.DIM_X, Game.DIM_Y);
  this.allObjects().forEach(obj => obj.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(obj => obj.move());
};

Game.prototype.wrap = function(pos) {
  return [
    Util.wrap(pos[0], Game.DIM_X), Util.wrap(pos[1], Game.DIM_Y)
  ];
};

Game.prototype.checkCollisions = function() {
  const objects = this.allObjects();
  for (let i = 0; i < objects.length - 1; i++) {
    for (let j = i + 1; j < objects.length; j++) {
      if (objects[i].isCollidedWith(objects[j])) {
        objects[i].collideWith(objects[j]);
      }
    }
  }
};

Game.prototype.step = function() {
  this.moveObjects();
  this.checkCollisions();
};

Game.prototype.remove = function(obj) {
  if (obj instanceof Bullet) {
    this.bullets.splice(this.bullets.indexOf(obj), 1);
  } else if (obj instanceof Asteroid) {
    this.asteroids.splice(this.asteroids.indexOf(obj), 1);
  } else if (obj instanceof Ship) {
    this.ships.splice(this.ships.indexOf(obj), 1);
  }
};

Game.prototype.allObjects = function() {
  return [...this.asteroids, ...this.bullets, ...this.ships];
};

Game.prototype.isOutOfBounds = function(pos) {
  return (pos[0] < 0) || (pos[0] > Game.DIM_X) || (pos[1] < 0) || (pos[1] > Game.DIM_Y);
}

module.exports = Game;
