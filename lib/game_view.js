const Game = require("./game.js");

function GameView(ctx) {
  this.game = new Game;
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
  key('down', () => this.game.ship.power([0, 1]) );
  key('up', () => this.game.ship.power([0, -1]) );
  key('left', () => this.game.ship.power([-1, 0]) );
  key('right', () => this.game.ship.power([1, 0]) );
  key('space', () => this.game.ship.fireBullet() );
};

module.exports = GameView;
