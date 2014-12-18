window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Enemy = (function(){
  	 
var Enemy = function(pos, game){
	 
    EmojiA.Smiley.call(this, {	
		pos: pos,
		game: game,
		direction: EmojiA.Util.directionBetweenCoords(pos, game.hero.pos),
		speed: EmojiA.Util.randomNum(8)
    });
    
	this.FILL_COLOR = "gray";
	this.MOUTH_OFFSET = 6;
	this.MOUTH_BEGINNING = Math.PI * 1.65;
	this.MOUTH_ENDING = Math.PI * 2.45;
	
	this.updateVelocity();
};

EmojiA.Util.inherits(Enemy, EmojiA.Smiley);
  
Enemy.prototype.draw = function(ctx){
	if (this.dead) {
		this.TRANSFORM -= .1;
		this.FILL_COLOR = EmojiA.Util.getTransparentColor(this.deadColor, this.frames/10);
		this.LINE_COLOR = EmojiA.Util.getTransparentColor("black", this.frames/10);
	}
	EmojiA.Smiley.prototype.draw.call(this, ctx);
};
   
Enemy.prototype.move = function() {
	this.pos[0] += this.vel[0];
	this.pos[1] += this.vel[1];
 	if (this.game.isOutofBounds(this.pos)) {
   		this.reverse();
	}
};

Enemy.prototype.collideWith = function(otherObject){
	if (otherObject instanceof EmojiA.Enemy){
		this.reverse();
		otherObject.reverse();
	} else if (otherObject instanceof EmojiA.Hero) {
		this.die();
	    this.game.removeLife();
	} else {
	  this.game.remove(otherObject);
	  this.die();
	}
};

Enemy.prototype.die = function () {
	this.collidable = false;
	this.dead = true;
	this.deadColor = ["magenta", "lime", "cyan"][Math.floor(Math.random() * 3)];
	this.frames = 10;
	this.TRANSFORM = 1.3;
}

Enemy.prototype.isExpired = function(){
	return this.dead && ((this.frames--) < 0);
};
  
return Enemy;
})();