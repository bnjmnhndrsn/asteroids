window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

EmojiA.GameView = (function(){
  
var GameView = function(canvas) {
    	this.game = new EmojiA.Game();
    	this.ctx = canvas.getContext("2d");
};
  
GameView.prototype.start = function() {
    var gameview = this;
    var gameInterval = setInterval(function(){
      gameview.bindKeyHandlers();
      gameview.game.step();
      gameview.game.draw(gameview.ctx);
	  if (gameview.game.isOver()){
		  clearInterval(gameInterval);
	  }
    }, 20);
};
  
GameView.prototype.bindKeyHandlers = function(){
	var ACCELERATION = .4;
		TURN = .1;
    	speed = 0;
    	direction = 0;
	
    if (key.isPressed(32)){
		this.game.hero.fireBullet();
    }
    if (key.isPressed(37)) {
      direction -= TURN;
    }
    if (key.isPressed(39)) {
      direction += TURN;
    }
    if (key.isPressed(38)) {
      speed += ACCELERATION;
    }
    else if (key.isPressed(40)) {
      speed -= ACCELERATION;
    }
	else {
		speed -= .1;
	}
    
    this.game.hero.power(speed, direction);
};

return GameView;
  
})();