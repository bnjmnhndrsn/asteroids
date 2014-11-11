window.Asteroids = (window.Asteroids) ? window.Asteroids : {};

window.Asteroids.Util = (function(){
	
var Util = {};

Util.inherits = function(SubClass, ParentClass){
  var Surrogate = function(){};
  Surrogate.prototype = ParentClass.prototype;
  SubClass.prototype = new Surrogate();
};

Util.randomVec = function(length){
  result = [];
  for (var i = 0; i < length; i++){
    result.push((Math.random() * 6) - 3);
  }
  return result;
};

return Util;

})();
