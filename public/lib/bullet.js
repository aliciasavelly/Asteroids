const Util = require("./utils.js");
const MovingObject = require("./moving_objects.js");

B_DEFAULTS = {
  RADIUS: 5,
  COLOR: "#00d60a"
}

function Bullet(options) {
  options.color = B_DEFAULTS.COLOR;
  options.radius = B_DEFAULTS.RADIUS;

  MovingObject.call(this, options);
}

Util.inherits(Bullet, MovingObject);

Bullet.prototype.isWrappable = false;

module.exports = Bullet;
