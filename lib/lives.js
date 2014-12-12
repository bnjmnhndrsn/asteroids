window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Lives = (function(){
 
	var Lives = function(numLives){
	  this.numLives = numLives;
	};

	Lives.prototype.draw = function(ctx) {
		var X = 5;
		var Y = 5;
		ctx.textBaseline = "top";
		ctx.font="32px Impact";
		ctx.lineWidth = 3;
		ctx.lineJoin = 'round';
		ctx.strokeStyle = 'black';
		ctx.strokeText("LIVES: " + this.numLives, X, Y);
		ctx.fillStyle = "yellow";
		ctx.fillText("LIVES: " + this.numLives, X, Y);
		
	};

	return Lives;
})();