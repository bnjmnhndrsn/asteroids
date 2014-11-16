window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.Ship = (function(){
  
  var Ship = function(pos, game){
    Asteroids.Smiley.call(this, {
      vel: [0, 0],
      pos: pos,
      game: game,
      direction: Math.PI * 1.5,
      speed: 0,
    });
	
	this.FILL_COLOR = "yellow";
	this.MOUTH_OFFSET = 0;
	this.MOUTH_BEGINNING = Math.PI * .6;
	this.MOUTH_ENDING = Math.PI * 1.4;
    
  };
  
  Asteroids.Util.inherits(Ship, Asteroids.Smiley);

  Ship.RADIUS = 10;
  Ship.MAX_SPEED = 2;
  
  
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