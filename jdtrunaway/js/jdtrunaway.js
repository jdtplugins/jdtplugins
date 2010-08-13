/**
 * jDTRunAway
 *
 * @version      $Rev$
 * @author       nori (http://twitter.com/5509)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdtrunaway/index.html
 *
 * @Base-script-written-by
 *               hisasann (http://hisasann.com/housetect/)
 *               http://hisasann.com/housetect/2009/04/jqueryrunawayfrommouse_part2.html 
 * 
 * $Date$
 */
(function($) {

	var mouseX, mouseY, dE = document.documentElement;

	$.fn.jdtRunAway = function(options) {
		
		var c = $.extend({
			rate: 60,
			instance: 1000
		}, options);
		
		$(document)
			.mousemove(function(e) {
				mouseY = e.pageY ? e.pageY : event.clientY + dE.scrollTop;
				mouseX = e.pageX ? e.pageX : event.clientX + dE.scrollLeft;
			})
			.keydown(function(e) {
				if ( e.keyCode == 9 ) {
					alert('ひきょうもの！');
					return false;
				}
			});
			
		$(this).each(function() {
			mover(this, c.instance, c.rate);
		});
			
	}
	
	function mover(selector, instance, rate) {
		var firstPointX = [],
			firstPointY = [],
			$this = $(selector);
			
		// offsetの保存
		$this.each(function(index) {
			var self = $(this),
				offset = self.offset();
			firstPointX[index] = offset.left;
			firstPointY[index] = offset.top;
			
			self.after($('<span/>')
				.css({
					display: 'inline-block',
					width: self.width()
				})
			);
		});
		
		(function(){
			$this.each(function(index) {
				var elem = $(this),
					offset = elem.offset(),
					theta = Math.atan2(offset.top - mouseY, offset.left - mouseX),
					d = instance / Math.sqrt(Math.pow(mouseX - offset.left, 2) + Math.pow(mouseY - offset.top, 2)),
					left = parseInt(offset.left) + d * Math.cos(theta) + (firstPointX[index] - offset.left) * 0.1,
					top = parseInt(offset.top) + d * Math.sin(theta) + (firstPointY[index] - offset.top) * 0.1;
					
				if ( !isNaN(top) && !isNaN(left) ) {
					elem.css({
						left: left,
						top: top
					});
				} else {
					elem.css('position', 'absolute');
				}
			});
			
			setTimeout(arguments.callee, rate);
		})();
	}
				
})(jQuery)