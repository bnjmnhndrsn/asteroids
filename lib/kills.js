window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Kills = (function(){
 
	var Kills = function(){
	  this.numKills = 0;
	};

	Kills.prototype.draw = function(ctx) {
		var X = 350;
		var Y = 5;
		ctx.textBaseline = "top";
		ctx.font="32px Impact";
		ctx.fillStyle = "yellow";
		ctx.fillText("KILLS: " + this.numKills, X, Y);
	
	};
	
	Kills.prototype.increment = function(){
		this.numKills++;
	};
	
	Kills.prototype.getKills = function(){
		return this.numKills;
	};

	return Kills;
})();