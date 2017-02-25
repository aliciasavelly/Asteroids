/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	//same as astreroids.js in directions

	const GameView = __webpack_require__(1);
	const Asteroid = __webpack_require__(3);
	const Game = __webpack_require__(2);

	document.addEventListener("DOMContentLoaded", () => {
	  const canvasEl = document.getElementById("game-canvas");
	  canvasEl.height = window.innerHeight;
	  canvasEl.width = window.innerWidth;
	  const ctx = canvasEl.getContext('2d');

	  new GameView(ctx).start();
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(2);

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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(3);
	const Bullet = __webpack_require__(8);
	const Ship = __webpack_require__(6);


	function Game() {
	  this.DIM_X = window.innerWidth;
	  this.DIM_Y = window.innerHeight;
	  this.NUM_ASTEROIDS = 20;

	  this.asteroids = this.addAsteroids();
	  this.ship = new Ship(this.randomPosition(), this);
	  this.bullets = [];
	}

	Game.prototype.addAsteroids = function() {
	  const asteroids = [];
	  for (let i = 0; i < this.NUM_ASTEROIDS; i++) {
	    const a = new Asteroid(this.randomPosition(), this);
	    asteroids.push(a);
	  }
	  return asteroids;
	};

	Game.prototype.randomPosition = function() {
	  return [Math.random() * this.DIM_X, Math.random() * this.DIM_Y];
	};

	Game.prototype.draw = function(ctx) {
	  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
	  this.allObjects().forEach(a => a.draw(ctx));
	};

	Game.prototype.moveObjects = function() {
	  this.allObjects().forEach(a => a.move());
	};

	Game.prototype.wrap = function(pos) {
	  if (pos[0] <= 0) { pos[0] = this.DIM_X; }
	  else if (pos[0] >= this.DIM_X) { pos[0] = 0; }

	  if (pos[1] <= 0) { pos[1] = this.DIM_Y; }
	  else if (pos[1] >= this.DIM_Y) { pos[1] = 0; }
	};

	Game.prototype.checkCollisions = function() {
	  const objects = this.allObjects();
	  for (let i = 0; i < objects.length - 1; i++) {
	    for (let j = i + 1; j < objects.length; j++) {
	      if (objects[i].isCollidedWith(objects[j])) {
	        objects[i].collideWith(objects[j]);
	      }
	    }
	  }
	};

	Game.prototype.step = function() {
	  this.moveObjects();
	  this.checkCollisions();
	};

	Game.prototype.remove = function(obj) {
	  if (obj instanceof Bullet) {
	    this.bullets.splice(this.bullets.indexOf(obj), 1);
	  } else if (obj instanceof Asteroid) {
	    this.asteroids.splice(this.asteroids.indexOf(obj), 1);
	  }
	  // obj.vel = [0, 0];
	  // obj.pos = [-1000 * Math.random() - 100, -100 * Math.random() - 100];
	};

	Game.prototype.allObjects = function() {
	  return [...this.asteroids, ...this.bullets, this.ship];
	};

	module.exports = Game;


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);
	const Ship = __webpack_require__(6);
	const Bullet = __webpack_require__(8);

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


/***/ },
/* 4 */
/***/ function(module, exports) {

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


/***/ },
/* 5 */
/***/ function(module, exports) {

	const Util = {
	  inherits(ChildClass, ParentClass) {
	    ChildClass.prototype = Object.create(ParentClass.prototype);
	    ChildClass.prototype.constructor = ChildClass;
	  },

	  // Return a randomly oriented vector with the given length.
	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },

	  // Scale the length of a vector by the given amount.
	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};


	module.exports = Util;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Bullet = __webpack_require__(8);
	const Util = __webpack_require__(5);

	function Ship(pos, game) {
	  const RADIUS = 20;
	  const COLOR = "#e24a4a";

	  MovingObject.call(this, {"pos": pos,
	                          "radius": RADIUS,
	                          "color": COLOR,
	                          "vel": [0, 0]}, game);
	}

	Util.inherits(Ship, MovingObject);

	Ship.prototype.relocate = function() {
	  this.pos = this.game.randomPosition();
	  this.vel = [0, 0];
	};

	Ship.prototype.power = function(impulse) {
	  this.vel[0] += impulse[0];
	  this.vel[1] += impulse[1];
	};

	Ship.prototype.fireBullet = function() {
	  const b = new Bullet(this.pos, [-5, 5], this.game);
	  this.game.bullets.push(b);
	};

	module.exports = Ship;


/***/ },
/* 7 */,
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(4);
	const Util = __webpack_require__(5);

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


/***/ }
/******/ ]);