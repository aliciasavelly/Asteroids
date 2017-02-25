function MovingObject(options, game) {
  this.pos = options['pos'];
  this.vel = options['vel'];
  this.radius = options['radius'];
  this.color = options['color'];
  this.game = game;
}

MovingObject.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI);
  ctx.fillStyle = this.color;
  ctx.fill();
};

MovingObject.prototype.move = function() {
  this.pos[0] += this.vel[0];
  this.pos[1] += this.vel[1];
  this.game.wrap(this.pos);
};

MovingObject.prototype.isCollidedWith = function(otherObject) {
  const xdiff = this.pos[0] - otherObject.pos[0];
  const ydiff = this.pos[1] - otherObject.pos[1];

  const dist = Math.sqrt(Math.pow(xdiff, 2) + Math.pow(ydiff, 2));
  return dist < this.radius + otherObject.radius;
};

MovingObject.prototype.collideWith = function(otherObject) {};

// MovingObject.prototype.relocate = function() {};
MovingObject.prototype.power = function(impulse) {};


module.exports = MovingObject;
