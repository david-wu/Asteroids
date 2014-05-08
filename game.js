(function (root) {
  var App = root.App = (root.App || {});
  var Asteroid = App.Asteroid
  var Ship = App.Ship
  var Game = App.Game = function (ctx, window) {
      this.stepCount = 0;
      this.ctx = ctx;
      this.asteroids = this.addAsteroids(5);
      this.ship = new App.Ship([(Game.DIM_X / 2), (Game.DIM_Y / 2)], [0,0]);
      this.bindKeyHandler();
      this.window = window

  }

  Game.DIM_X = 1500;
  Game.DIM_Y = 1000;
  Game.FPS = 30;

  Game.prototype.addAsteroids = function (numAsteroids) {
    var asteroids = [];

    for (var i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroid.randomAsteroid(Game.DIM_X, Game.DIM_Y));
    }

    return asteroids;
  }

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);


    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }

    this.ship.draw(this.ctx);
  }

  Game.prototype.move = function () {
    this.ship.move();
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
  }

  Game.prototype.step = function () {
    this.stepCount += 1;
    this.checkCollision();
    this.draw();
    this.move();

  }

  Game.prototype.checkCollision = function () {

    //checks for asteroids colliding with your ship
    for (var i = 0; i < this.asteroids.length; i++){
      if ((this.ship.evade === 0) && this.asteroids[i].isCollidedWith(this.ship)) {
        this.draw();
        alert('You Died');

        this.asteroids = []
      }
    }

  }

  Game.prototype.start = function () {
    game = this;

    window.setInterval(function () {
          game.step();
        }, 12.5);
  }

  Game.prototype.bindKeyHandler = function () {
    var ship = this.ship
    key('a', function(){ship.power([-0.25,0])});
    key('d', function(){ship.power([0.25,0])});
    key('w', function(){ship.power([0,-0.25])});
    key('s', function(){ship.power([0,0.25])});
    key('space', function(){ship.useEvade()});
  }


})(this)