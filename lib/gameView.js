window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

EmojiA.GameView = (function(){
  
var GameView = function(canvas) {
    	this.game = new EmojiA.Game();
    	this.ctx = canvas.getContext("2d");
};
  
GameView.prototype.start = function(callback) {
	this._isPlaying = true;
	this._isPaused = false;
	var gameview = this;
	$("#game-canvas").on("mousemove", function(event){
		gameview.game.mouseInput([event.offsetX, event.offsetY]);
	})
    
    var gameInterval = setInterval(function(){
		if (!gameView.isPaused()){
			gameview.game.hero.fireBullet();
			gameview.checkKeyHandlers();
			gameview.game.step();
			gameview.game.draw(gameview.ctx);
		}
			
		if (gameview.game.isOver()){
		clearInterval(gameInterval);
		callback();
		}
    }, 20);
};

GameView.prototype.isPaused = function(){
	return this._paused;
};

GameView.prototype.pause = function(){
	this._paused = true;
};

GameView.prototype.resume = function(){
	this._paused = false;
};
  
GameView.prototype.checkKeyHandlers = function(){
	TURN = .1;
	direction = 0;
    if (key.isPressed(37)) {
      direction -= TURN;
    }
    if (key.isPressed(39)) {
      direction += TURN;
    }
	this.game.hero.power(direction);
};

GameView.prototype.isPlaying = function(){
	return this._isPlaying;
}

return GameView;
  
})();