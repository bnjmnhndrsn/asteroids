window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.Asteroid = (function(){
  	 
  var Asteroid = function(pos, game){
    Asteroids.movingObject.call(this, {
      color: Asteroid.COLOR,
      radius: Asteroid.RADIUS,
      vel: Asteroids.Util.randomVec(2),
      pos: pos,
      game: game
    });
    
  };
  
  Asteroids.Util.inherits(Asteroid, Asteroids.movingObject);

  Asteroid.COLOR = "gray";
  Asteroid.RADIUS = 10;
  
  Asteroid.prototype.collideWith = function(otherObject){
	if (otherObject instanceof Asteroids.Asteroid){
		this.reverse();
	} else if (otherObject instanceof Asteroids.Ship) {
        otherObject.relocate();
    } else {
      this.game.remove(otherObject);
	  this.game.remove(this);
    }
  };
  
  return Asteroid;
})();