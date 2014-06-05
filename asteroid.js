Function.prototype.inherits = function (superClass) {
  function Surrogate () {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
};

(function (root) {

  var App = root.App = (root.App || {});
  var MovingObject = App.MovingObject;

  var Asteroid = App.Asteroid = function (pos, vel){
    color = Asteroid.COLOR;
    rad = Asteroid.RADIUS;
    MovingObject.call(this, pos, vel, color, rad);
  }

  Asteroid.inherits(MovingObject);

  Asteroid.COLOR = "black";
  Asteroid.RADIUS = 0;
  Asteroid.SPEED = 8;
  Asteroid.randomVec = function () {
    var x = Math.floor(Math.random() * Asteroid.SPEED) - (Asteroid.SPEED/2);
    var y = Math.floor(Math.random() * Asteroid.SPEED) - (Asteroid.SPEED/2);

    // reroll until speed is high enough
    if(Math.pow(Math.pow(x,2) + Math.pow(y,2), 0.5) < 3){
      return Asteroid.randomVec();
    }
    return [x, y];
  }

  Asteroid.randomAsteroid = function (dimX, dimY) {

    var x = Math.floor(Math.random() * dimX);
    var y = Math.floor(Math.random() * dimY);
    return new Asteroid([x,y], this.randomVec() )
  }

})(this);












// var Game = MovingObjects.Game = function (posX, posY, numCircles) {
//     this. = posX;
//     this.yDim = yDim;
//
//     this.circles = []
//     for (var i = 0; i < numCircles; ++i) {
//       this.circles.push(Circle.randomCircle(xDim, yDim));
//     }
//   }
