window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Streak = (function(){
 
	var Streak = function(){
	  this.numStreak = 0;
	};

	Streak.prototype.draw = function(ctx) {
		if (this.numStreak > 0) {
			var X = 300;
			var Y = 5;
			var text = "STREAK: " + this.numStreak + "X";
			ctx.textBaseline = "top";
			ctx.font="32px Impact";
			ctx.lineJoin = 'round';
			ctx.lineWidth = 3;
			ctx.strokeStyle = 'black';
			ctx.strokeText(text, X, Y);
			ctx.fillStyle = "yellow";
			ctx.fillText(text, X, Y);
		}
	
	};
	
	Streak.prototype.increment = function(){
		this.numStreak++;
	};
	
	Streak.prototype.setReset = function(){
		var timestamp = new Date();
		this.timestamp = timestamp;
		return function(){
			if (timestamp === this.timestamp) {
				this.numStreak = 0;
			}
		}.bind(this);
	}
	
	Streak.prototype.get = function(){
		return this.numStreak;
	};

	return Streak;
})();