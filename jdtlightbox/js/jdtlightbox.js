/**
 * jDTLightBox
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

	$.fn.jdtLightBox = function(options) {
		var c = $.extend({
				default: {
					width: 150,
					height: 150
				},
				animateTo: {
					width: 32,
					height: 32
				}
			}, options),
			$this = $(this),
			dE = document.documentElement,
			dEW = dE.clientWidth,
			dEH = dE.clientHeight;
			
		$(window).resize(function() {
			dEW = dE.clientWidth;
			dEH = dE.clientHeight;
		});
		
		$('body').append([
			'<div id="dtLightBoxLayer"/>',
			'<div id="dtLightBoxContainer">',
				'<div id="dtLightBoxClose"/>',
				'<div id="dtLightBoxImage"/>',
			'</div>'
		].join(''));
		
		var $layer = $('#dtLightBoxLayer').hide(),
			$container = $('#dtLightBoxContainer'),
			$close = $('#dtLightBoxClose'),
			$image = $('#dtLightBoxImage');
			
		$layer.css({
			width: dEW+'px',
			height: dEH+'px',
			position: 'fixed',
			top: 0,
			left: 0
			/*marginTop: -document.documentElement.clientHeight/2,
			marginLeft: -document.documentElement.clientWidth/2,
			position: 'absolute',
			top: '50%',
			left: '50%'*/
		});
			
		$this.click(function() {
			return false;
		});
			
		$this.click(function() {
			$layer.show();
			$container.css({
				marginTop: -c.default.height/2,
				marginLeft: -c.default.width/2,
				width: c.default.width,
				height: c.default.height,
				position: 'absolute',
				top: '50%',
				left: '50%'
			});
			
			var img = new Image();
			img.src = this.href;
			img.width = img.width;
			img.height = img.height;
			
			$container.animate({
				width: img.width,
				height: img.height
			},{
				duration: 400,
				easing: 'swing'
			});
			
			return false;			
		});
	}

})(jQuery)