const Asteroid = require('./asteroid.js');
const Bullet = require('./bullet.js');
const Ship = require('./ship.js');


function Game() {
  this.DIM_X = window.innerWidth;
  this.DIM_Y = window.innerHeight;
  this.NUM_ASTEROIDS = 20;

  this.asteroids = this.addAsteroids();
  this.ship = new Ship(this.randomPosition(), this);
  this.bullets = [];
}

Game.prototype.addAsteroids = function() {
  const asteroids = [];
  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
    const a = new Asteroid(this.randomPosition(), this);
    asteroids.push(a);
  }
  return asteroids;
};

Game.prototype.randomPosition = function() {
  return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
};

Game.prototype.draw = function(ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.allObjects().forEach(a => a.draw(ctx));
};

Game.prototype.moveObjects = function() {
  this.allObjects().forEach(a => a.move());
};

Game.prototype.wrap = function(pos) {
  if (pos[0] <= 0) { pos[0] = this.DIM_X; }
  else if (pos[0] >= this.DIM_X) { pos[0] = 0; }

  if (pos[1] <= 0) { pos[1] = this.DIM_Y; }
  else if (pos[1] >= this.DIM_Y) { pos[1] = 0; }
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
  }
  // obj.vel = [0, 0];
  // obj.pos = [-1000 * Math.random() - 100, -100 * Math.random() - 100];
};

Game.prototype.allObjects = function() {
  return [...this.asteroids, ...this.bullets, this.ship];
};

module.exports = Game;
