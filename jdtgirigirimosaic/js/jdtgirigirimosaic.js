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

	$.fn.jdtGirigiriMosaic = function(options) {
		
		var c = $.extend({
				size: 5
			}, options),
			$this = $(this);
			
		$this.each(function() {
			giriMosa(this, c);
		});
	}
	
	function giriMosa(target, c) {
		var canvas = document.createElement('canvas'),
			$this = $(target),
			size = {
				width: $this.width(),
				height: $this.height()
			},
			context = canvas.getContext('2d');
			
		canvas.width = size.width;
		canvas.height = size.height;
		context.drawImage(target, 0, 0);
		
		$('body').append(canvas);
		
	    for ( var y = 0; y < size.height; y += c.size ) {
	        var h = (c.size <= size.height - y) ? c.size : size.height - y;
	        
	        for ( var x = 0; x < size.width; x += c.size ) {
	            var w = (c.size <= size.width - x) ? c.size : size.width - x;
	            
	            var r = 0;
	            var g = 0;
	            var b = 0;

				console.log(x + '\n' + y + '\n' + w + '\n' + h);
				console.log(context);
	            var data = context.getImageData(x, y, w, h).data;
	            var dataLength = data.length;
	            
	            console.log(data + '\n' + dataLength)
	            
	            for ( var pixelIndex = 0; pixelIndex < dataLength; pixelIndex += 4 ) {
	                r += data[pixelIndex];
	                g += data[pixelIndex + 1];
	                b += data[pixelIndex + 2];
	            }
	            
	            var pixelCount = dataLength / 4;
	            
	            r = Math.floor(r / pixelCount);
	            g = Math.floor(g / pixelCount);
	            b = Math.floor(b / pixelCount);
	            
	            context.clearRect(x, y, w, h);
	            context.fillStyle = 'rgb(' + r + ',' + g + ',' + b + ')';
	            context.fillRect(x, y, w, h);
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