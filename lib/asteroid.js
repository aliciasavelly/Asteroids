const MovingObject = require("./moving_objects.js");
const Util = require("./utils.js");
const Ship = require("./ship.js");
const Bullet = require("./bullet.js");

function Asteroid(pos, game) {
  const COLOR = "blue";
  const RADIUS = 10;

  MovingObject.call(this, {"pos": pos,
                          "radius": RADIUS,
                          "color": COLOR,
                          "vel": Util.randomVec(5)}, game);

}

Util.inherits(Asteroid, MovingObject);

Asteroid.prototype.collideWith = function(otherObject) {
  if (otherObject instanceof Ship) {
    otherObject.relocate();
  } else if (otherObject instanceof Bullet) {
    this.game.remove(otherObject);
    this.game.remove(this);
  }
};

module.exports = Asteroid;
