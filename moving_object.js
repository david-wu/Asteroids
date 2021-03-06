Function.prototype.inherits = function (superClass) {
  function Surrogate () {};
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
};

(function (root) {

  var App = root.App = (root.App || {});
  var Game = App.Game;

  var MovingObject = App.MovingObject = function (pos, vel, color, rad) {
    this.color = color;
    this.rad = rad;
    this.vel = vel;
    this.pos = pos;
  };

  MovingObject.prototype.move = function () {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];

    //puts object on otherside of board
    if (this.pos[0] > App.DIM_X + (this.rad*1)) {
      this.pos[0] -= (App.DIM_X + (this.rad*2));
    }
    if (this.pos[0] < 0 - (this.rad*1)) {
      this.pos[0] += (App.DIM_X + (this.rad*2));
    }
    if (this.pos[1] > App.DIM_Y + (this.rad*1)) {
      this.pos[1] -= (App.DIM_Y + (this.rad*2));
    }
    if (this.pos[1] < 0 - (this.rad*1)) {
      this.pos[1] += (App.DIM_Y + (this.rad*2));
    }

  }

  MovingObject.prototype.draw = function (ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();

    ctx.arc(
      this.pos[0],
      this.pos[1],
      this.rad,
      0,
      2 * Math.PI,
      false
    );

    ctx.fill();
  }

  MovingObject.prototype.isCollidedWith = function (OtherObject) {
    var x_length = this.pos[0] - OtherObject.pos[0];
    var y_length = this.pos[1] - OtherObject.pos[1];
    var distance = Math.sqrt(Math.pow(x_length,2) + Math.pow(y_length,2))
    var total_radius = this.rad + OtherObject.rad;
    return distance < total_radius;
  }
})(this)
