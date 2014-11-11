window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.movingObject = (function(){
  var movingObject = function (obj){
    for(property in obj){
      this[property] = obj[property];
    }
  };
  
  movingObject.prototype.draw = function(ctx) {
    ctx.beginPath();
    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = this.color;
    ctx.fill();
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
  
  return movingObject;
  
})();

