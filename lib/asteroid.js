const Util = require("./utils.js");
const MovingObject = require("./moving_objects.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

const A_DEFAULTS = {
  COLOR: "#4decf2",
  RADIUS: 10
};

const NUM_TURNS = 5;
let TURNS_TAKEN = 0;

function Asteroid(options) {
  options.color = A_DEFAULTS.COLOR;
  options.radius = A_DEFAULTS.RADIUS;
  options.vel = Util.randomVec(5);

  MovingObject.call(this, options);
}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    TURNS_TAKEN += 1;
    if (TURNS_TAKEN >= NUM_TURNS) {
      this.game.remove(otherObject);
      alert('GAME OVER!! Refresh to try again!');
    } else {
      otherObject.relocate();
    }
  } else if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
    if (this.game.asteroids.length === 0) {
      alert('YOU WIN!! Refresh to play again!');
    }
  }
};

module.exports = Asteroid;
