window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.Asteroid = (function(){
  	 
  var Asteroid = function(pos, game){
    Asteroids.movingObject.call(this, {
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      pos: pos,
      game: game,
	  direction: Asteroids.Util.randomNum(Math.PI * 2);
	  speed: Asteroids.Util.randomNum(3);
	  spawner: true
    });
    
	this.updateVelocity();
  };
  
  Asteroids.Util.inherits(Asteroid, Asteroids.movingObject);
  
  Asteroid.prototype.draw = function(ctx){
	  
  	ctx.beginPath();
  	ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
  	ctx.fillStyle = 'orange';
  	ctx.fill();
  	ctx.lineWidth = 1;
  	ctx.strokeStyle = 'black';
  	ctx.stroke();

  	var eyeRadius = 1;
  	var eyeXOffset = 5;
  	var eyeYOffset = 4;

  	// draw the eyes
  	ctx.beginPath();
  	var leftEye = [-eyeXOffset, -eyeYOffset];
  	ctx.arc(this.pos[0] + leftEye[0], this.pos[1] + leftEye[1], eyeRadius, 0, 2 * Math.PI, false);
  	var rightEye = [eyeXOffset, -eyeYOffset];
  	ctx.arc(this.pos[0] + rightEye[0], this.pos[1] + rightEye[1], eyeRadius, 0, 2 * Math.PI, false);
  	ctx.fillStyle = 'black';
  	ctx.fill();

  	//draw the mouth
	var mouthOffset = 7
  	ctx.beginPath();
  	ctx.arc(this.pos[0], this.pos[1] + mouthOffset, this.radius / 2, Math.PI * 1.1, Math.PI * 1.9, false);
  	ctx.stroke();
  	
  }
  
  Asteroid.prototype.collideWith = function(otherObject){
	if (otherObject instanceof Asteroids.Asteroid){
		this.reverse();
		otherObject.reverse();
		
		if (this.spawner && otherObject.spawner) {
			this.game.addObject(new Asteroid(Asteroids.Game.randomPosition(), this.game), 10);
			this.spawner = false, otherObject.spawner = false;
			this.addToQueue(function(){ this.spawner = true }, 20);
			otherObject.addToQueue(function(){ this.spawner = true }, 20);
		}
		
		
	} else if (otherObject instanceof Asteroids.Ship) {
        otherObject.relocate();
    } else {
      this.game.remove(otherObject);
	  this.game.remove(this);
    }
  };
  
  return Asteroid;
})();