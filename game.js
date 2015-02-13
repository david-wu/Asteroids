(function (root) {
  var App = root.App = (root.App || {});
  var Asteroid = App.Asteroid
  var Ship = App.Ship

  var Game = App.Game = function (ctx, window) {
    this.stepCount = 0;
    this.ctx = ctx;
    this.ctx.font="20px Georgia";

    this.asteroids = this.addAsteroids(5);
    this.ship = new App.Ship([(App.DIM_X / 2), (App.DIM_Y / 2)], [0,0]);
    this.bindKeyHandler();
    this.window = window
  }

  Game.prototype.addAsteroids = function (numAsteroids) {
    var asteroids = [];
    for (var i = 0; i < numAsteroids; i++) {
      asteroids.push(Asteroid.randomAsteroid(App.DIM_X, App.DIM_Y));
    }
    return asteroids;
  }

  Game.prototype.step = function () {
    this.stepCount += 1;
    this.draw();
    this.checkCollision();
    this.move();
    for (var i = 0; i < this.asteroids.length; i++) {
      var asteroid = this.asteroids[i]
      if (asteroid.rad < 200){
        asteroid.rad += 0.25;
      }
    }
  }

  Game.prototype.draw = function () {
    this.ctx.clearRect(0, 0, App.DIM_X, App.DIM_Y);
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }
    this.ctx.fillStyle='blue';
    this.ctx.fillText(""+(Math.floor(this.stepCount/10)),10,50);
    if (this.ship.evade > 0){
      this.ctx.fillStyle='green';
      this.ctx.fillText(""+(Math.floor(this.ship.evade)),App.DIM_X-50, 50);
    }else{
      this.ctx.fillStyle='orange';
      this.ctx.fillText(""+(Math.floor(this.ship.evade_count)),App.DIM_X-50, 50);
    }

    this.ship.draw(this.ctx);
  }

  Game.prototype.checkCollision = function () {
    for (var i = 0; i < this.asteroids.length; i++){
      if ((this.ship.evade === 0) && this.asteroids[i].isCollidedWith(this.ship)) {
        this.draw();
        alert('You Died');
        window.clearInterval(this.intervalID);
      }
    }
  }

  Game.prototype.move = function () {
    this.ship.power();
    this.ship.move();
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].move();
    }
  }

  Game.prototype.start = function () {
    var game = this;
    this.intervalID = window.setInterval(function () {
          game.step();
        }, 12.5);
  }

  Game.prototype.bindKeyHandler = function () {
    var ship = this.ship
    $(window).keydown(function(key){
      switch(key.keyCode){
      case 32:
        ship.useEvade()
        break;
      case 37:
        ship.left_key_pressed = true;
        break;
      case 38:
        ship.up_key_pressed = true;
        break;
      case 39:
        ship.right_key_pressed = true;
        break;
      case 40:
        ship.down_key_pressed = true;
        break;
      }
    })
    $(window).keyup(function(key){
      switch(key.keyCode){
      case 37:
        ship.left_key_pressed = false;
        break;
      case 38:
        ship.up_key_pressed = false;
        break;
      case 39:
        ship.right_key_pressed = false;
        break;
      case 40:
        ship.down_key_pressed = false;
        break;
      }
    })
  }


})(this)
