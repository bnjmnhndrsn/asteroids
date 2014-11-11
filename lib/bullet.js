window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.Bullet = (function(){
 
  var Bullet = function(pos, vel, game){
	  
    this.vel = (vel[0] === 0 && vel[1] === 0) ? vel = [0, -1] : [vel[0] * 1.5, vel[1] * 1.5];
    
    Asteroids.movingObject.call(this, {
      color: Bullet.COLOR,
      radius: Bullet.RADIUS,
      pos: pos,
      game: game,
	  frames: Bullet.FRAMES
    });
    
  };
  
  Asteroids.Util.inherits(Bullet, Asteroids.movingObject);
  
  Bullet.FRAMES = 50;
  Bullet.COLOR = "red";
  Bullet.RADIUS = 5;
  
  Bullet.prototype.collideWith = function(otherObject){
    if (otherObject instanceof Asteroids.Asteroid) {
      this.game.remove(this);
      this.game.remove(otherObject);
    }
  };
  
  Bullet.prototype.isWrappable = false;
  
  Bullet.prototype.isExpired = function(){
	 return ((this.frames--) < 0);
  };
  
  Bullet.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    if (this.frames > 10 || this.frames % 2) {
		ctx.fill();
	}
  };
  
  return Bullet;
})();