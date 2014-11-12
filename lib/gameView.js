window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

Asteroids.GameView = (function(){
  
var GameView = function(canvas) {
    	this.game = new Asteroids.Game();
    	this.ctx = canvas.getContext("2d");
};
  
GameView.prototype.start = function() {
    var gameview = this;
    setInterval(function(){
      gameview.bindKeyHandlers();
      gameview.game.step();
      gameview.game.draw(gameview.ctx);
    }, 20);
};
  
GameView.prototype.bindKeyHandlers = function(){
    var speed = 0;
    var direction = 0;
	
    if (key.isPressed(32)){
      this.game.ship.fireBullet();
    }
    if (key.isPressed(37)) {
      direction -= .1;
    }
    if (key.isPressed(39)) {
      direction += .1;
    }
    if (key.isPressed(38)) {
      speed += .1;
    }
    else if (key.isPressed(40)) {
      speed -= .1;
    }
	else {
		speed -= .03;
	}
    
    this.game.ship.power(speed, direction);
};

return GameView;
  
})();