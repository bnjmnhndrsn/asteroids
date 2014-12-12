window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.App = (function () {
	var musicPlayingUrl = "url('images/glyphicons-185-volume-up.png')",
		musicMutedUrl = "url('images/glyphicons-183-mute.png')",
		gamePlayingUrl = "url('images/glyphicons-174-play.png')",
		gamePausedUrl = "url('images/	glyphicons-175-pause.png')",
		player;
	
	var App = function () {
		this.$music = $("#music");
		this.$pause = $("#pause");
		this.$play = $("#play");
		this.canvas = document.getElementById("game-canvas");
		this.gameView = new EmojiA.GameView(this.canvas);
		this.plays = 0;
		
		
		//YT Player initialization script
		var tag = document.createElement('script');
		tag.src = "https://www.youtube.com/iframe_api";
		var firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		
		function onYouTubeIframeAPIReady() {
		  player = new YT.Player('player', {
		    events: {
		      'onReady': onPlayerReady
		    }
		  });
		}
		
		var onPlayerReady = function (event) {
			
		}
		
		//click handlers
		this.bindClickHandlers();	
	};
	
	
	App.prototype.bindPause = function () {
		var that = this;
		this.$pause.click(function(){
			if (that.gameView && that.gameView.isPaused()){
				that.$pause.css("background-image", gamePausedUrl);
				that.gameView.resume();
			} else {
				that.$pause.css("background-image", gamePlayingUrl);
				that.gameView.pause();
			}
		});
	}
	
	// App.prototype.playAgain = function (event) {
	// 	$play.find(".text").html("<h1 class='title'>You lose... Play again?</h1>")
	// 	$play.show();
	// 	$("#play button").click(function(){
	// 	  $play.hide();
	// 	  gameView = new EmojiA.GameView(canvas);
	// 	  gameView.start(playAgain);
	// 	  $(this).off("click");
	// 	});
	// }
	
	App.prototype.bindStart = function () {
		if (this.plays > 0) {
			this.$play.find(".text").html("<h1 class='title'>You lose... Play again?</h1>");
		}
		this.$play.show();
		var that = this;
		
		this.$play.find("button").click(function () {
			that.plays++;
		  	that.$play.hide();
		  	$("#corner-buttons").show();
		  	that.gameView.start(that.bindStart.bind(that));
		  	$(this).off("click");
		});
	}
	
	App.prototype.bindMusic = function () {
		this.$music.click(function(){
			if (player) {		
				var state = player.getPlayerState();
				if (state == 1) {
					this.$music.css("background-image", musicMutedUrl);
					player.pauseVideo();
				} else {
					this.$music.css("background-image", musicPlayingUrl);
					player.playVideo();
				}
			}
		});
	}
	
	App.prototype.bindClickHandlers = function () {
		this.bindPause();
		this.bindMusic();
		this.bindStart();
	};
	return App;
})();



