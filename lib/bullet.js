const Util = require("./utils.js");
const MovingObject = require("./moving_objects.js");

BULLET = {
  RADIUS: 5,
  COLOR: "#00d60a"
}

function Bullet(options) {
  options.color = BULLET.COLOR;
  options.radius = BULLET.RADIUS;

  MovingObject.call(this, options);
}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;

module.exports = Bullet;
