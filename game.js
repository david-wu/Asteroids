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

    //draw asteroids, then score/evades, then ship
    for (var i = 0; i < this.asteroids.length; i++) {
      this.asteroids[i].draw(this.ctx);
    }
    this.ctx.font="20px Georgia";
    this.ctx.fillStyle='blue';
    this.ctx.fillText(""+(Math.floor(this.stepCount/10)),10,50);
    this.ctx.font="20px Georgia";
    if (this.ship.evade > 0){
      this.ctx.fillStyle='green';
      this.ctx.fillText(""+(Math.floor(this.ship.evade)),Game.DIM_X-50, 50);
    }else{
      this.ctx.fillStyle='orange';
      this.ctx.fillText(""+(Math.floor(this.ship.evade_count)),Game.DIM_X-50, 50);
    }

    this.ship.draw(this.ctx);
  }

  Game.prototype.checkCollision = function () {

    //checks for asteroids colliding with your ship
    for (var i = 0; i < this.asteroids.length; i++){
      if ((this.ship.evade === 0) && this.asteroids[i].isCollidedWith(this.ship)) {
        this.draw();
        // alert('You Died');

        this.ship.rad *= 0.99
        if (this.ship.rad < 2){
          this.ship.rad = -1;
        }

        // this.asteroids = []
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

  Game.prototype.step = function () {
    this.stepCount += 1;
    this.draw();
    this.checkCollision();
    this.move();
    for (var i = 0; i < this.asteroids.length; i++) {
      var asteroid = this.asteroids[i]

      if (asteroid.rad < 500){
        asteroid.rad+=0.25;
      }
      // var asteroidSpeed = Math.pow(asteroid.vel[0],2) + Math.pow(asteroid.vel[1],2)
      // if (asteroidSpeed < 10){
      //   asteroid.vel[0] = asteroid.vel[0] * (1.01);
      //   asteroid.vel[1] = asteroid.vel[1] * (1.01);
      //   console.log(asteroidSpeed);
      // }
    }
    //this.ship.rad += 0.01



  }



  Game.prototype.start = function () {
    game = this;

    window.setInterval(function () {
          game.step();
        }, 12.5);
  }

  Game.prototype.bindKeyHandler = function () {
    var ship = this.ship

    key('space', function(){ship.useEvade()});
    $(window).keydown(function(key){
      console.log(key.keyCode);
      switch(key.keyCode){
      case 37:
        ship.left_key_pressed = 1;
        break;
      case 38:
        ship.up_key_pressed = 1;
        break;
      case 39:
        ship.right_key_pressed = 1;
        break;
      case 40:
        ship.down_key_pressed = 1;
        break;
      }
    })
    $(window).keyup(function(key){
      console.log(key.keyCode);
      switch(key.keyCode){
      case 37:
        ship.left_key_pressed = 0;
        break;
      case 38:
        ship.up_key_pressed = 0;
        break;
      case 39:
        ship.right_key_pressed = 0;
        break;
      case 40:
        ship.down_key_pressed = 0;
        break;
      }
    })
  }


})(this)