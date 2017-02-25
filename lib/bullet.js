const MovingObject = require("./moving_objects.js");
const Util = require("./utils.js");

function Bullet(pos, vel, game) {
  const COLOR = "green";
  const RADIUS = 3;

  let options = {};
  options["pos"] = pos;
  options["radius"] = RADIUS;
  options["color"] = COLOR;
  options["vel"] = [10, 10];

  const [x, y] = vel;

  MovingObject.call(this, options, game);
}

Util.inherits(Bullet, MovingObject);

module.exports = Bullet;
