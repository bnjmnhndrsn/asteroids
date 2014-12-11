window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Enemy = (function(){
  	 
  var Enemy = function(pos, game){
    EmojiA.Smiley.call(this, {	
      pos: pos,
      game: game,
	  direction: EmojiA.Util.randomNum(Math.PI * 2),
	  speed: EmojiA.Util.randomNum(3)
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