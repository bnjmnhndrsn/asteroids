window.EmojiA = (window.EmojiA) ? window.EmojiA : {};

window.EmojiA.Util = (function(){
	
var Util = {};

Util.inherits = function(SubClass, ParentClass){
  var Surrogate = function(){};
  Surrogate.prototype = ParentClass.prototype;
  SubClass.prototype = new Surrogate();
};

Util.rotatePoint = function(coord, angle){
  var x1 = coord[0], y1 = coord[1];
  var x2 = x1 * Math.cos(angle) - y1 * Math.sin(angle);
  var y2 = y1 * Math.cos(angle) + x1 * Math.sin(angle);
  return [x2, y2];
}

Util.randomVec = function(length){
  result = [];
  for (var i = 0; i < length; i++){
    result.push((Math.random() * 6) - 3);
  }
  return result;
};

Util.randomNum = function(max){
	return Math.random() * max;
}

Util.getCloudCanvas = function(dim_x, dim_y){
	var buffer = document.createElement('canvas');
	buffer.width = 800;
	buffer.height = 10000;
	ctx = buffer.getContext('2d');
	ctx.fillStyle="lightblue";
	ctx.fillRect(0, 0, 800, 10000);
	for (var i = 0; i < 300; i++){
		ctx.beginPath();
		ctx.arc(Math.random() * 800, Math.random() * 10000, 
			40, 0, 2 * Math.PI, false);
		ctx.fillStyle = 'white';
		ctx.fill();
	}
	
	return buffer;
};

Util.directionBetweenCoords = function(coord1, coord2){
	var deltaY = coord2[1] - coord1[1];
 	var deltaX = coord2[0] - coord1[0];
	var angle = Math.atan2(deltaY, deltaX);
	return angle;
};

var colorRGB = {
	"black":  "0,0,0",
 	"white": 	 "255,255,255",
 	"red": "255,0,0",
 	"lime": "0,255,0",
 	"blue":  "0,0,255",
 	"yellow":  "255,255,0",
 	"cyan":  "0,255,255",
 	"magenta": 	 "255,0,255",
 	"silver"	: "192,192,192",
 	"gray":	 "128,128,128",
 	"maroon":	"128,0,0",
 	"olive":	 "128,128,0",
 	"green":	 "0,128,0",
 	"purple":	 "28,0,128",
 	"teal":	 "0,128,128",
 	"navy":	 "0,0,128"
 }

Util.getTransparentColor = function(color, opacity){
	return "rgba(" + colorRGB[color] + "," + opacity + ")";
}

return Util;

})();
