window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Enemy = (function(){
  	 
  var Enemy = function(pos, game){
    EmojiA.Smiley.call(this, {	
      pos: pos,
      game: game,
	  direction: EmojiA.Util.randomNum(Math.PI * 2),
	  speed: EmojiA.Util.randomNum(3),
	  spawner: true
    });
    
	this.COLOR = "orange";
	this.MOUTH_OFFSET = 6;
	this.MOUTH_BEGINNING = Math.PI * 1.65;
	this.MOUTH_ENDING = Math.PI * 2.45;
	
	this.updateVelocity();
  };
  
  EmojiA.Util.inherits(Enemy, EmojiA.Smiley);
  
  Enemy.prototype.collideWith = function(otherObject){
	if (otherObject instanceof EmojiA.Enemy){
		this.reverse();
		otherObject.reverse();
		
		if (this.spawner && otherObject.spawner) {
			this.game.addObject( new Enemy(EmojiA.Game.randomPosition(), this.game), 10 );
			this.spawner = false, otherObject.spawner = false;
			this.game.addToQueue( function(){ 
				this.spawner = true, otherObject.spawner = true;
			}.bind(this), 20);
		}
		
		
	} else if (otherObject instanceof EmojiA.Hero) {
		this.game.remove(this);
        this.game.removeLife();
    } else {
      this.game.remove(otherObject);
	  this.game.remove(this);
    }
  };
  
  return Enemy;
})();