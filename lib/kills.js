window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Kills = (function(){
 
	var Kills = function(){
	  this.numKills = 0;
	};

	Kills.prototype.draw = function(ctx) {
		var X = 600;
		var Y = 5;
		var text = "KILLS: " + this.numKills;
		ctx.textBaseline = "top";
		ctx.font="32px Impact";
		ctx.lineWidth = 3;
		ctx.lineJoin = 'round';
		ctx.strokeStyle = 'black';
		ctx.strokeText(text, X, Y);
		ctx.fillStyle = "yellow";
		ctx.fillText(text, X, Y);
	
	};
	
	Kills.prototype.increment = function(){
		this.numKills++;
	};
	
	Kills.prototype.get = function(){
		return this.numKills;
	};

	return Kills;
})();