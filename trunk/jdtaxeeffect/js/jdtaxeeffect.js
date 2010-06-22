/**
 * jDTAXEEffect
 *
 * @version      $Rev$
 * @author       nori (http://twitter.com/5509)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdtrunaway/index.html
 *
 * $Date$
 */
(function($) {

	var mouseX, mouseY, dE = document.documentElement;

	$.fn.jdtAXEEffect = function(options) {
		
		var c = $.extend({
				rate: 60,
				duration: 300
			}, options),
			elms = $(this);
			
		elms.each(function() {
			this.pos = {
				x: Math.floor( Math.random() * elms.length * 10 ),
				y: Math.floor( Math.random() * elms.length * 10 )
			}
			console.log(this.pos.x + '\n' + this.pos.y)
			
			AXEEffect(this, c.rate, elms);
		});
		
		$(document)
			.mousemove(function(e) {
				mouseY = e.pageY ? e.pageY : event.clientY + dE.scrollTop;
				mouseX = e.pageX ? e.pageX : event.clientX + dE.scrollLeft;
			});			
	}
	
	function AXEEffect(elm, rate, elms) {
	
		var $this = $(elm);
			
		// offsetの保存
		$this.each(function(index) {
			var _this = $(this),
				offset = $(this).offset();
			
			_this.after($('<span/>')
				.css({
					display: 'inline-block',
					width: _this.width()
				})
			);
		});

		(function(){
			$this.each(function(index) {
				var elem = $(this)
					left = mouseX + this.pos.x,
					top = mouseY + this.pos.y;
					
				if ( !isNaN(top) && !isNaN(left) ) {
					elem.css({
						left: left,
						top: top
					});
				} else {
					elem.css('position', 'absolute');
				}
				
				this.pos = {
					x: Math.floor( Math.random() * elms.length ),
					y: Math.floor( Math.random() * elms.length )
				}
			});
			
			setTimeout(arguments.callee, rate);
		})();
	
	}
				
})(jQuery)