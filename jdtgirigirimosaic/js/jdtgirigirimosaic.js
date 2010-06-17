/**
 * jDTRunAway
 *
 * @version      $Rev$
 * @author       nori (http://twitter.com/5509)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdtgirigirimosaic/index.html
 *
 * $Date$
 */
(function($) {

	$.fn.jdtGirigirimosaic = function(options) {
		
		var c = $.extend({
				size: 5
			}, options),
			$this = $(this);
			
		$this.each(function() {
			giriMosa(this);
		});
	}
	
	function mosaic(target) {
		var canvas = $('<canvas/>');
		canvas.attr({
			width: target.width(),
			height: target.height()
		});
		
		
		
		
	    var img = document.getElementById("img");
	    var canvas = document.getElementById("canvas");
	    var imgWidth = canvas.width = img.width;
	    var imgHeight = canvas.height = img.height;
	    var context = canvas.getContext("2d");
	    context.drawImage(img, 0, 0);
	    
	    var index = document.forms[0].mosaicSize.selectedIndex;
	    var size = new Number( document.forms[0].mosaicSize.options[index].value );
	    
	    for(var y = 0; y < imgHeight; y += size){
	        var h = (size <= imgHeight - y) ? size : imgHeight - y;
	        
	        for(var x = 0; x < imgWidth; x += size){
	            var w = (size <= imgWidth - x) ? size : imgWidth - x;
	            
	            var r = 0;
	            var g = 0;
	            var b = 0;

	            var data = context.getImageData(x,y,w,h).data;
	            var dataLength = data.length;
	            
	            for(var pixelIndex = 0; pixelIndex < dataLength; pixelIndex += 4) {
	                r += data[pixelIndex];
	                g += data[pixelIndex + 1];
	                b += data[pixelIndex + 2];
	            }
	            
	            var pixelCount = dataLength / 4;
	            
	            r = Math.floor(r / pixelCount);
	            g = Math.floor(g / pixelCount);
	            b = Math.floor(b / pixelCount);
	            
	            context.clearRect(x,y,w,h);
	            context.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
	            context.fillRect(x,y,w,h);
	       }
	    }
	}
	
	function getImageTimer(img, callback) {
		var timer = setInterval(function() {
				// width & height gotten
				if ( img.width > 0 && img.height > 0 ) {
					clearInterval(timer);
					callback();
				}
			}, 10);
	}
				
})(jQuery)