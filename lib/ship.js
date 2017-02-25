const MovingObject = require("./moving_objects.js");
const Bullet = require("./bullet.js");
const Util = require("./utils.js");

function Ship(pos, game) {
  const RADIUS = 20;
  const COLOR = "#e24a4a";

  MovingObject.call(this, {"pos": pos,
                          "radius": RADIUS,
                          "color": COLOR,
                          "vel": [0, 0]}, game);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
  this.vel = [0, 0];
};

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];
};

Ship.prototype.fireBullet = function() {
  const b = new Bullet(this.pos, [-5, 5], this.game);
  this.game.bullets.push(b);
};

module.exports = Ship;
