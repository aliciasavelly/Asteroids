const Game = require("./game.js");

function GameView(ctx) {
  num_a = prompt("How many asteroids do you want to start with?");
  this.game = new Game(num_a);
  this.ctx = ctx;
}

GameView.prototype.start = function() {
  this.bindKeyHandlers();

  setInterval(() => {
    this.game.step();
    this.game.draw(this.ctx);
  }, 20);
};

GameView.prototype.bindKeyHandlers = function() {
  key('down', () => this.game.ships[0].power([0, 1]) );
  key('up', () => this.game.ships[0].power([0, -1]) );
  key('left', () => this.game.ships[0].power([-1, 0]) );
  key('right', () => this.game.ships[0].power([1, 0]) );
  key('space', () => this.game.ships[0].fireBullet() );
};

module.exports = GameView;
