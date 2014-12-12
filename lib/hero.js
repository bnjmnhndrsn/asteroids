window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.EmojiA.Hero = (function(){
  
	var Hero = function(pos, game){
		EmojiA.Smiley.call(this, {
		  vel: [0, 0],
		  pos: pos,
		  game: game,
		  direction: Math.PI * 1.5,
		  speed: 4
		});

		this.FILL_COLOR = "yellow";
		this.MOUTH_OFFSET = 0;
		this.MOUTH_BEGINNING = Math.PI * .6;
		this.MOUTH_ENDING = Math.PI * 1.4;
	};

	EmojiA.Util.inherits(Hero, EmojiA.Smiley);

	Hero.prototype.collideWith = function(otherObject){
		if (otherObject instanceof EmojiA.Enemy) {
		  this.game.removeLife();  
		  this.game.remove(otherObject);
		}
	};

	Hero.prototype.reverse = function(){
		this.direction = (this.direction + Math.PI) % ( 2 * Math.PI);
		this.updateVelocity();
	}

	Hero.prototype.changeDirection = function(direction){
		this.direction = direction % (Math.PI * 2)
		this.updateVelocity();
	}

	Hero.prototype.incrementDirection = function(direction){
		this.direction += direction;
		this.direction = this.direction % (Math.PI * 2)
		this.updateVelocity();
	}
  
	Hero.prototype.fireBullet = function() {
	  	var vel = this.vel.slice(0), pos = this.pos.slice(0);
		vel =  [vel[0] * -1.5, vel[1] * -1.5];
	
		var bullet = new EmojiA.Bullet(pos, vel, this.game);
		this.game.bullets.push(bullet);
	};
	
	Hero.prototype.reverse = function(){
		this.incrementDirection( Math.PI );
	};
  
  return Hero;
})();