/**
 * jDTRunAway
 *
 * @version      $Rev$
 * @author       nori (http://twitter.com/5509)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdtlightbox/index.html
 *
 * $Date$
 */
(function($) {

	var mouseX, mouseY;

	$.fn.jdtRunAway = function(options) {
		
		$(document)
			.mousemove(function(e) {
				mouseY = e.pageY;
				mouseX = e.pageX;
			});
			
		$(this).each(function() {
			mover(this);
		});
			
	}
	
	function mover(selector) {
		var firstPointX = [],
			firstPointY = [];

		// offsetの保存
		$(selector).each(function(index) {
			var offset = $(this).offset();
			firstPointX[index] = offset.left;
			firstPointY[index] = offset.top;
		});
		
		var $this = $(selector);

		(function() {
			$this.each(function(index) {
				var elem = $(this),
					offset = elem.offset(),
					theta = Math.atan2(offset.top - mouseY, offset.left - mouseX),
					d = 100 / Math.sqrt(Math.pow(mouseX - offset.left, 2) + Math.pow(mouseY - offset.top, 2)),
				
				left = parseInt(elem.css("left")) + d * Math.cos(theta) + (firstPointX[index] - offset.left) * 0.1 + "px",
				top = parseInt(elem.css("top")) + d * Math.sin(theta) + (firstPointY[index] - offset.top) * 0.1 + "px";

				elem.css({
					position: 'absolute',
					left: left,
					top: top
				});
			});
			
			setTimeout(arguments.callee, 60);
		})();
	}
				
})(jQuery)