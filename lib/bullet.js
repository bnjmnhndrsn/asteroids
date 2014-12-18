window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Bullet = (function(){
 
var Bullet = function(pos, vel, game){
	var frames = Bullet.FRAMES + game.streak.get();
	frames = frames > Bullet.MAX_FRAMES ? Bullet.MAX_FRAMES : frames;

	EmojiA.movingObject.call(this, {
		radius: Bullet.RADIUS,
		pos: pos,
		game: game,
		frames: frames,
		vel : vel
	});

	this.FILL_COLOR = Bullet.getColor();
	this.RADIUS = 5;
};

EmojiA.Util.inherits(Bullet, EmojiA.movingObject);


Bullet.COLORS = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
Bullet.CURRENT_COLOR_INDEX = 0;
Bullet.FRAMES = 11;
Bullet.MAX_FRAMES = 25;


Bullet.getColor = function(){
	return Bullet.COLORS[(Bullet.CURRENT_COLOR_INDEX++ / 3) % Bullet.COLORS.length];
}

Bullet.prototype.collideWith = function(otherObject){
	if (otherObject instanceof EmojiA.Enemy) {
		this.game.remove(this);
		this.game.remove(otherObject);
	}
};

Bullet.prototype.isWrappable = false;

Bullet.prototype.isExpired = function(){
	return ((this.frames--) < 0);
};

Bullet.prototype.draw = function(ctx) {
	this.drawBody(ctx);
};

return Bullet;
})();