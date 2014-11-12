window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.Ship = (function(){
  
  var Ship = function(pos, game){
    Asteroids.movingObject.call(this, {
      color: Ship.COLOR,
      radius: Ship.RADIUS,
      vel: [0, 0],
      pos: pos,
      game: game,
      direction: Math.PI * 1.5,
      speed: 0,
	  energyMeter: new Asteroids.EnergyMeter()
    });
    
  };
  
  Asteroids.Util.inherits(Ship, Asteroids.movingObject);

  Ship.COLOR = "#F778A1";
  Ship.RADIUS = 10;
  Ship.MAX_SPEED = 2;
  
Ship.prototype.draw = function(ctx) {
	
	//draw the body
	ctx.beginPath();
	ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'yellow';
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = 'black';
	ctx.stroke();

	var eyeRadius = 1;
	var eyeXOffset = 5;
	var eyeYOffset = 4;

	// draw the eyes
	ctx.beginPath();
	var leftEye = Asteroids.Util.rotatePoint([-eyeXOffset, -eyeYOffset], this.direction + Math.PI * .5);
	ctx.arc(this.pos[0] + leftEye[0], this.pos[1] + leftEye[1], eyeRadius, 0, 2 * Math.PI, false);
	var rightEye = Asteroids.Util.rotatePoint([eyeXOffset, -eyeYOffset], this.direction + Math.PI * .5);
	ctx.arc(this.pos[0] + rightEye[0], this.pos[1] + rightEye[1], eyeRadius, 0, 2 * Math.PI, false);
	ctx.fillStyle = 'black';
	ctx.fill();

	//draw the mouth
	ctx.beginPath();
	ctx.arc(this.pos[0], this.pos[1], this.radius / 2, this.direction + Math.PI * .6, this.direction + Math.PI * 1.4, false);
	ctx.stroke();
	
	//draw the energy meter
	this.energyMeter.draw(ctx);

};

  
  Ship.prototype.relocate = function(){
    this.pos = Asteroids.Game.randomPosition();
    this.vel = [0, 0];
  };
  
  Ship.prototype.collideWith = function(otherObject){
    if (otherObject instanceof Asteroids.Asteroid) {
      this.relocate();  
      this.game.remove(otherObject);
    }
  };
  
  
  Ship.prototype.updateVelocity = function(){
      var y = Math.sin(this.direction);
      var x = Math.cos(this.direction);
      this.vel[0] = x * this.speed;
      this.vel[1] = y * this.speed;
  };
  
  Ship.prototype.reverse = function(){
	 this.direction = (this.direction + Math.PI) % ( 2 * Math.PI);
	 this.updateVelocity();
  }
  
  Ship.prototype.power = function(speed, direction){
	this.speed += speed;
	if (this.speed > Ship.MAX_SPEED) {
		this.speed = Ship.MAX_SPEED;
	} else if (this.speed < 0) {
		this.speed = 0;
	}

    this.direction += direction;
	this.direction = this.direction % (Math.PI * 2)
	
	this.updateVelocity();
  }
  
Ship.prototype.fireBullet = function() {
  	var vel = this.vel.slice(0), pos = this.pos.slice(0);
	
    if (vel[0] === 0 && vel[1] === 0) {
		vel = [Math.cos(this.direction), Math.sin(this.direction)] 
	}
	vel =  [vel[0] * 1.5, vel[1] * 1.5];	
	
	var bullet = new Asteroids.Bullet(pos, vel, this.game);
	this.game.bullets.push(bullet);
};
  
  
  
  return Ship;
})();