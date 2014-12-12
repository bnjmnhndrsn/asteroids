window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Streak = (function(){
 
	var Streak = function(){
	  this.numStreak = 0;
	};

	Streak.prototype.draw = function(ctx) {
		var X = 350;
		var Y = 550;
		ctx.textBaseline = "top";
		ctx.font="32px Impact";
		ctx.fillStyle = "yellow";
		ctx.fillText("STREAK: " + this.numStreak, X, Y);
	
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