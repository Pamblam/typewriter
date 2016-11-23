/**
 * typewriter function for jQuery
 * License: WTFPL - http://www.wtfpl.net/
 */
(function($) {
	
	function typeStuff($selector, stuffToType, typeDelay, callback){
		stuffToType = stuffToType.split('');
		var s = false;
		var int = setInterval(function(){
			if(!$selector.find(".blinky").length){
				$selector.append("<span class='blinky'>|</span>");
				setInterval(function(){ $selector.find(".blinky").css('opacity', s?0:1); s=!s; }, 500);
			}
			$("<span>"+stuffToType.shift()+"</span>").insertBefore($selector.find(".blinky"));
			if(!stuffToType.length) clearInterval(int), callback();
		}, typeDelay);
	}
	
	function typewriter($selector, allTheStuffToType, typeDelay, pauseDelay, index){
		var currentStuffIndex = undefined === index ? 0 : index; 
		typeStuff($selector, allTheStuffToType[currentStuffIndex], typeDelay, function(){
			setTimeout(function(){
				var int = setInterval(function(){
					$selector.find(".blinky").prev().remove();
					if($selector.find("span").length === 1){
						clearInterval(int);
						var nextIndex = undefined === allTheStuffToType[currentStuffIndex+1] ? 0 : currentStuffIndex+1;
						typewriter($selector, allTheStuffToType, typeDelay, pauseDelay, nextIndex);
					}
				}, typeDelay);
			}, pauseDelay);
		});
	}
	
    $.fn.typewriter = function(allTheStuffToType, typeDelay, pauseDelay) {
		typewriter($(this), allTheStuffToType, typeDelay, pauseDelay)
    };
	
})(jQuery);