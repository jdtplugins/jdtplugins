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
			}, options);
			
		$(this).each(function() {
			giriMosa(this, c.size);
		});
	}
	
	function giriMosa(t, ms) {
		var cvs = document.createElement('canvas'),
			$this = $(t),
			s = {
				w: $this.width(),
				h: $this.height()
			},
			ctx = cvs.getContext('2d');
			
		cvs.width = s.w;
		cvs.height = s.h;
		ctx.drawImage(t, 0, 0);
		
		$this.replaceWith(cvs);
		
	    for ( var y = 0; y < s.h; y += ms ) {
	        var h = ms <= s.h - y
	        	? ms : s.h - y;
	        
	        for ( var x = 0; x < s.w; x += ms ) {
	            var w = ms <= s.w - x
	            	? ms : s.w - x;
	            
	            applyRGBReplace(ctx, x, y, w, h);
	            
	       }
	    }
	}
	
	function applyRGBReplace(ctx, x, y, w, h) {
		var r = g = b = 0,
			D = ctx.getImageData(x, y, w, h).data,
			floor = function(rgb) {
				return Math.floor(rgb / ( D.length / 4 ) );
			};
					
		for ( var px = 0; px < D.length; px += 4 ) {
		    r = r + D[px];
		    g = g + D[px + 1];
		    b = b + D[px + 2];
		}
		
		ctx.clearRect(x, y, w, h);
		ctx.fillStyle = 'rgb(' + floor(r) + ',' + floor(g) + ',' + floor(b) + ')';
		//console.log(floor(r) + ',' + floor(g) + ',' + floor(b))
		ctx.fillRect(x, y, w, h);
	}	
				
})(jQuery)