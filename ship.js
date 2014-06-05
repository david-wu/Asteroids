(function (root) {

  var App = root.App = (root.App || {});
  var MovingObject = App.MovingObject;

  var Ship = App.Ship = function (pos, vel, evade_count){
    color = Ship.COLOR;
    rad = Ship.RADIUS;

    this.up_key_pressed = 0;
    this.down_key_pressed = 0;
    this.left_key_pressed = 0;
    this.right_key_pressed = 0;

    //keeps track of temporary invulnerability
    this.evade_count = 3
    this.evade = 150;

    MovingObject.call(this, pos, vel, color, rad);
  }

  Ship.inherits(MovingObject);
  Ship.RADIUS = 15;
  Ship.COLOR = "red";

  Ship.prototype.useEvade = function (){
    if (this.evade_count > 0){
      this.evade += 150;
      this.evade_count -= 1;
    }
  }

  Ship.prototype.draw = function (ctx) {

    if(this.evade > 0){
      this.evade -= 1
      this.color = "green";
    }else{
      this.color = "red";
    }

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

  Ship.prototype.power = function (impulse) {
    var accel = [];
    accel[0] = 0;
    accel[1] = 0;

    if(this.left_key_pressed){
      accel[0] += -0.1
    }
    if(this.right_key_pressed){
      accel[0] += 0.1
    }
    if(this.up_key_pressed){
      accel[1] += -0.1
    }
    if(this.down_key_pressed){
      accel[1] += +0.1
    }

    this.vel[0] += accel[0];
    this.vel[1] += accel[1];
  }

})(this);
