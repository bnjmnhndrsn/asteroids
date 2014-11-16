window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.Asteroid = (function(){
  	 
  var Asteroid = function(pos, game){
    Asteroids.Smiley.call(this, {	
      pos: pos,
      game: game,
	  direction: Asteroids.Util.randomNum(Math.PI * 2),
	  speed: Asteroids.Util.randomNum(3),
	  spawner: true
    });
    
	this.COLOR = "orange";
	this.MOUTH_OFFSET = 6;
	this.MOUTH_BEGINNING = Math.PI * 1.65;
	this.MOUTH_ENDING = Math.PI * 2.45;
	
	this.updateVelocity();
  };
  
  Asteroids.Util.inherits(Asteroid, Asteroids.Smiley);
  
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