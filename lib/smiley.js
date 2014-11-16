window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.Smiley = (function(){

var Smiley = function(obj){
	Asteroids.movingObject.call(this, obj);

	this.RADIUS = 10;
	this.FILL_COLOR = "gray";
	this.LINE_WIDTH = 1;
	this.LINE_COLOR = "black";
	this.EYE_RADIUS = 1;
	this.EYE_X_OFFSET = 5;
	this.EYE_Y_OFFSET = 4;
	this.EYE_COLOR = "black";
	this.MOUTH_OFFSET = 7;
	this.MOUTH_RADIUS = this.RADIUS * .5;
};

Asteroids.Util.inherits(Smiley, Asteroids.movingObject);

Smiley.prototype.draw = function(ctx){
	this.drawBody(ctx);
	this.drawEyes(ctx);
	this.drawMouth(ctx);
};

Smiley.prototype.drawEyes = function(ctx){
	
	var 
		leftEye = this.offsetCoord(-this.EYE_X_OFFSET, -this.EYE_Y_OFFSET),
		rightEye = this.offsetCoord(this.EYE_X_OFFSET, -this.EYE_Y_OFFSET)
	;

	ctx.beginPath();
	ctx.strokeStyle = this.LINE_COLOR;
	ctx.arc(leftEye[0], leftEye[1], this.EYE_RADIUS, 0, 2 * Math.PI, false);
	ctx.arc(rightEye[0], rightEye[1], this.EYE_RADIUS, 0, 2 * Math.PI, false);
	ctx.fillStyle = this.EYE_COLOR;
	ctx.fill();
	
}

Smiley.prototype.drawMouth = function(ctx){
	var 
		mouthCoords = this.offsetCoord(0, this.MOUTH_OFFSET),
		mouthAngleBegin = this.offsetAngle(this.MOUTH_BEGINNING),
		mouthAngleEnd = this.offsetAngle(this.MOUTH_ENDING)
	;
	
	ctx.strokeStyle = this.LINE_COLOR;
	ctx.beginPath();
	ctx.arc(mouthCoords[0], mouthCoords[1], this.MOUTH_RADIUS, mouthAngleBegin, mouthAngleEnd, false);
	ctx.stroke();
};


return Smiley;
})();