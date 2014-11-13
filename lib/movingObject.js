window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.movingObject = (function(){
  var movingObject = function (obj){
    for(property in obj){
      this[property] = obj[property];
    }
	
	this.queue = [];
  };
  
  movingObject.prototype.draw = function(ctx) {
	 this.drawBody();
  };
  
  movingObject.prototype.drawBody = function(ctx){
  	ctx.beginPath();
  	ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
  	ctx.fillStyle = this.FILL_COLOR;
  	ctx.fill();
	
  	if (this.LINE_WIDTH){
		ctx.lineWidth = this.LINE_WIDTH;
	  	ctx.strokeStyle = this.LINE_COLOR;
	  	ctx.stroke();
	}
  };
  
  movingObject.prototype.updateVelocity = function(){
      var y = Math.sin(this.direction);
      var x = Math.cos(this.direction);
      this.vel[0] = x * this.speed;
      this.vel[1] = y * this.speed;
  };
  
  movingObject.prototype.isCollidedWith = function(otherObject) {
    var distance = Math.pow(otherObject.pos[0] - this.pos[0], 2) + 
    Math.pow(this.pos[1] - otherObject.pos[1], 2);
    
    return distance <= Math.pow(this.radius + otherObject.radius, 2);
  };
  
  movingObject.prototype.move = function() {
    this.pos[0] += this.vel[0];
    this.pos[1] += this.vel[1];
    if (this.game.isOutofBounds(this.pos)) {
      this.reverse();
 	}
  };
  
  movingObject.prototype.collideWith = function(otherObject){
  };
  
  movingObject.prototype.isWrappable = true;
  
  movingObject.prototype.isExpired = function(){ return false };
  
  movingObject.prototype.reverse = function(){
	  this.vel[0] = -this.vel[0];
	  this.vel[1] = -this.vel[1];
  };
  
  movingObject.prototype.advanceQueue = function(){
	 var pending = this.queue.shift();
	 var object = this;
	 
	 if (pending) {
		 pending.forEach(function(fn){
			 fn.apply(asteroid);
		 })
	 }
  };
  
  return movingObject;
  
})();

