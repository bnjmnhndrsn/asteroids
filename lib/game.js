window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Game = (function(){
  
  var Game = function(){
    var shipPos = Game.randomPosition();
    this.hero = new EmojiA.Hero(shipPos, this);
    this.enemies = [];
    this.bullets = [];
	this.clouds = EmojiA.Util.getCloudCanvas(Game.DIM_X, Game.DIM_Y);
	this.cloudsPoint = 0;
	this.queue = [];
	this.lives = new EmojiA.Lives(Game.STARTING_LIVES);
	this.kills = new EmojiA.Kills();
	this.streak = new EmojiA.Streak();
    this.addEnemies(Game.NUM_ENEMIES);
  };
  
  Game.DIM_X = 800;
  Game.DIM_Y = 600;
  Game.NUM_ENEMIES = 5;
  Game.STARTING_LIVES = 3;
  
  Game.randomPosition = function (){
    var x = Math.random() * Game.DIM_X;
    var y = Math.random() * Game.DIM_Y;
    return [x, y];
  };
  
  
  Game.prototype.wrap = function(pos){
    var x = pos[0];
    var y = pos[1];
    x = (x > Game.DIM_X) ? 0 : x;
    x = (x < 0) ? Game.DIM_X : x;
    y = (y > Game.DIM_Y) ? 0 : y;
    y = (y < 0) ? Game.DIM_Y : y;
    return [x, y];
  };
  
  Game.prototype.addToQueue = function(fn, delay){
	this.queue[delay] = (this.queue[delay]) ? this.queue[delay] : [];
	this.queue[delay].push(fn);
  }
  
  Game.prototype.addObject = function(object, delay){
	if (delay) {
		this.addToQueue( function(){ this.addObject(object) }.bind(this), delay );
	} else {
		if (object instanceof EmojiA.Enemy){
			this.enemies.push(object);
		}
		else if (object instanceof EmojiA.Bullet){
			this.bullets.push(object);
		}
	}
		
  };
  
  Game.prototype.advanceQueue = function(){
	 var pending = this.queue.shift();
	 if (pending) {
		 pending.forEach(function(fn){ 
			 fn();
		 });
	 }
	 
  	this.queue = (this.queue) ? this.queue : [];
	 
  };
  
  Game.prototype.addEnemies = function(num){
    for (var i = 0; i < num; i++){
      var pos = Game.randomPosition();
      this.addObject( new EmojiA.Enemy(pos, this) );
    }
  };
  
  
  Game.prototype.draw = function(ctx) {
    ctx.clearRect(0, 0, Game.DIM_X, Game.DIM_Y);
	ctx.drawImage(this.clouds, 0, this.cloudsPoint--);
    this.allObjects().forEach( function(object) {
      object.draw(ctx);
    });
	this.lives.draw(ctx);
	this.kills.draw(ctx);
	this.streak.draw(ctx);
  };
    
  Game.prototype.moveObjects = function() {
    this.allObjects().forEach( function(object) {
      object.move();
    })
  };
  
  Game.prototype.checkRegeneration = function(){
	  //increase the chance of the spawn by .15% with every kill
	  if (Math.random() > .99 - (this.kills.get() * .0015)) {
		  this.addEnemies(1);
	  }
	  
	  if (this.enemies.length == 0) {
		   //increases the number of enemies at screen clear
		  this.addEnemies(Math.floor(Game.NUM_ENEMIES * this.kills.get() / 5));
	  }
  }
  
  Game.prototype.checkExpired = function() {
	var game = this;
	
    this.allObjects().forEach( function(object) {
		if (object.isExpired()) {
			game.remove(object);
		}
    })
  };
  
  Game.prototype.checkCollisions = function() {
    var collidedPairs = [];
    var objects = this.allObjects();
    
    for (var i = 0; i < objects.length - 1; i++){
      for (var j = i + 1; j < objects.length; j++){
        if (objects[i].isCollidedWith(objects[j])){
          collidedPairs.push([objects[i], objects[j]]);
        }
      }
    }

    collidedPairs.forEach(function(pair){
      pair[0].collideWith(pair[1]);
    });
  };
  
  Game.prototype.step = function() {
	this.advanceQueue();
    this.moveObjects();
	this.checkExpired();
    this.checkCollisions();
	this.checkRegeneration();
  };
  
	Game.prototype.remove = function(obj){
		var arr = (obj instanceof EmojiA.Bullet) ? this.bullets : this.enemies;
		var index = arr.indexOf(obj);
		
		if (index >= 0) {
			if (obj instanceof EmojiA.Enemy) {
				this.kills.increment();
				this.streak.increment();
				this.addToQueue( this.streak.setReset(), 50);
			}
			arr.splice(index, 1);
		}
	};
  
  Game.prototype.allObjects = function(){
    return this.enemies.concat([this.hero]).concat(this.bullets);
  }
  
  Game.prototype.isOutofBounds = function(pos){
    var x = pos[0];
    var y = pos[1];
    return (x < 0 || x > Game.DIM_X || y < 0 || y > Game.DIM_Y);
  };
  
  Game.prototype.removeLife = function(){
	  this.lives.numLives--;
  };
  
  Game.prototype.isOver = function(){
	 return this.lives.numLives <= 0;
  }
    
  return Game;
  
})();