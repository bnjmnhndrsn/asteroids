window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.EnergyMeter = (function(){

var EnergyMeter = function(){
  this.total =  EnergyMeter.STARTING_TOTAL;
  this.remaining =  EnergyMeter.STARTING_TOTAL;
};

EnergyMeter.STARTING_TOTAL = 1000;

EnergyMeter.prototype.increment = function(){
  this.remaining = (this.remaining++ > this.total) ? this.total : this.remaining;
};

EnergyMeter.prototype.decrement = function(){
	this.remaining -= 3;
	this.remaining = (this.remaining < 0) ? 0 : this.remaining;
};

EnergyMeter.prototype.isEnergyRemaining = function(){
  return this.remaining > 0;
};

EnergyMeter.prototype.draw = function(ctx){
	var barWidth = 150;
	ctx.fillStyle = "gray";
	ctx.fillRect(5, 5, barWidth + 7, 55);
	var endPoint = 6 + this.remaining / this.total * barWidth; 
	console.log(endPoint);
	ctx.fillStyle = "red";
	ctx.fillRect(6, 6, endPoint, 54);
};

return EnergyMeter;
})();