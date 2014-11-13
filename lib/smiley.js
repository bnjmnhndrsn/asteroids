window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.Smiley = (function(){

var Smiley = function(pos, game){
	Asteroids.movingObject.call(this, {
		pos: pos,
		game: game
	});

	this.RADIUS = 10;
	this.FILL_COLOR = "gray";
	this.LINE_WIDTH = 1;
	this.LINE_COLOR = "black";
	this.EYE_RADIUS = 1;
	this.EYE_X_OFFSET = 5;
	this.EYE_Y_OFFSET = 4;
	this.EYE_COLOR = "black";
	this.MOUTH_OFFSET = 7;
	this.MOUTH_BEGINNING = Math.PI * 1.1;
	this.MOUTH_ENDING = Math.PI * 1.9;
};

Asteroids.Util.inherits(Smiley, Asteroids.movingObject);

Smiley.prototype.draw = function(ctx){
	this.drawBody();
	this.drawEyes();
	this.drawMouth();
};

Smiley.prototype.drawEyes = function(ctx){
	var leftEye = this.getOffset(-this.EYE_X_OFFSET, -this.EYE_Y_OFFSET),
	rightEye = this.getEOffset(this.EYE_X_OFFSET, -this.EYE_Y_OFFSET);

	ctx.beginPath();
	ctx.strokeStyle = this.LINE_COLOR;
	ctx.arc(leftEye[0], leftEye[1], this.EYE_RADIUS, 0, 2 * Math.PI, false);
	ctx.arc(rightEye[0], rightEye[1], this.EYE_RADIUS, 0, 2 * Math.PI, false);
	ctx.fillStyle = this.EYE_COLOR;
	ctx.fill();
}

Smiley.prototype.getOffset = function(x, y){
	var rotated = Asteroids.Util.rotatePoint([x, y], this.direction + Math.PI * .5);
	return this.pos[0] + rotated[0], this.pos[1] + rotated[1];
}

Smiley.prototype.drawMouth = function(ctx){
	var mouth = this.getOffset(0, this.MOUTH_OFFSET);
	ctx.strokeStyle = this.LINE_COLOR;
	ctx.beginPath();
	ctx.arc(mouth[0], mouth[1], this.radius / 2, this.MOUTH_BEGINNING, this.MOUTH_ENDING, false);
	ctx.stroke();
};


return Smiley;
})();