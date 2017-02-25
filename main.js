//same as astreroids.js in directions

const GameView = require('./lib/game_view.js');
const Asteroid = require('./lib/asteroid.js');
const Game = require('./lib/game.js');

document.addEventListener("DOMContentLoaded", () => {
  const canvasEl = document.getElementById("game-canvas");
  canvasEl.height = window.innerHeight;
  canvasEl.width = window.innerWidth;
  const ctx = canvasEl.getContext('2d');

  new GameView(ctx).start();
});
