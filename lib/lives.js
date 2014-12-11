window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Lives = (function(){
 
	var Lives = function(numLives){
	  this.numLives = numLives;
	};

	Lives.prototype.draw = function(ctx) {
		var RADIUS = 5;
		var FILL_COLOR = "yellow";
		var Y = 15;
		var STARTING_X = 15;
		var SPACING = 15;
		
		for (var i = 0; i < this.numLives; i++){
			
			ctx.beginPath();
			ctx.arc(STARTING_X + i * SPACING, Y, RADIUS, 0, 2 * Math.PI, false);
			ctx.fillStyle = FILL_COLOR;
			ctx.fill();
		}
		
	};

	return Lives;
})();