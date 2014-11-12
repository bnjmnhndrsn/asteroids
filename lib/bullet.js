window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.Bullet = (function(){
 
  var Bullet = function(pos, vel, game){
	
    Asteroids.movingObject.call(this, {
      color: Bullet.getColor(),
      radius: Bullet.RADIUS,
      pos: pos,
      game: game,
	  frames: Bullet.FRAMES,
	  vel : vel
    });
    
  };
  
  Asteroids.Util.inherits(Bullet, Asteroids.movingObject);

  
  Bullet.COLORS = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
  Bullet.CURRENT_COLOR_INDEX = 0;
  Bullet.FRAMES = 50;
  Bullet.RADIUS = 5;
  
  Bullet.getColor = function(){
	  return Bullet.COLORS[(Bullet.CURRENT_COLOR_INDEX++ / 5) % Bullet.COLORS.length];
  }
  
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