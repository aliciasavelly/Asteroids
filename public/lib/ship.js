const MovingObject = require("./moving_objects.js");
const Util = require("./utils.js");
const Bullet = require("./bullet.js");

S_DEFAULTS = {
  RADIUS: 20,
  COLOR: "#e24a4a"
}

function Ship(options) {
  options.radius = S_DEFAULTS.RADIUS;
  options.vel = [0, 0];
  options.color = S_DEFAULTS.COLOR;

  MovingObject.call(this, options);
}

Util.inherits(Ship, MovingObject);

Ship.prototype.relocate = function() {
  this.pos = this.game.randomPosition();
};

Ship.prototype.power = function(impulse) {
  this.vel[0] += impulse[0];
  this.vel[1] += impulse[1];

  this.maintainVel(0);
  this.maintainVel(1);
};

Ship.prototype.maintainVel = function(coord) {
  if (this.vel[coord] < -8) {this.vel[coord] = -8}
  if (this.vel[coord] > 8) {this.vel[coord] = 8}
};

Ship.prototype.fireBullet = function() {
  const bullet_velocity = [this.vel[0] * 4, this.vel[1] * 4];

  if (this.vel[0] === 0 && this.vel[1] === 0) {
    bullet_velocity[0] = 3;
    bullet_velocity[1] = 3;

    if (Math.random() < .5) {
      bullet_velocity[0] *= -1;
      if (Math.random() > .5) {
        bullet_velocity[1] *= -1;
      }
    } else if (Math.random() < .5) {
      bullet_velocity[1] *= -1;
    }
  }

  const b = new Bullet({pos: this.pos, vel: bullet_velocity, game: this.game});
  this.game.bullets.push(b);
};

module.exports = Ship;
