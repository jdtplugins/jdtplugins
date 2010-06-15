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
			$layer = $('<div id="dtLightBoxLayer"/>'),
			$container = $('<div id="dtLightBoxContainer"/>'),
			$loading = $('<div id="dtLightBoxLoading"/>'),
			$close = $('<div id="dtLightBoxClose"/>'),
			$image = $('<div id="dtLightBoxImage"/>');
		
		$container.append(
			$close,
			$loading,
			$image
		);
		$('body').append([
			$layer,
			$container
		].join(''));
			
		$this.click(function() {
			$('#dtLightBoxLayer').show();
			$('#dtLightBoxContainer').css({
				width: c.default.width,
				height: c.default.height
			});
			
			var img = new Image();
			img.src = this.href;
			
			$container.animate({
				width: img.width,
				height: img.height
			},{
				duration: 400,
				easing: swing
			});
			
		});
	}

})(jQuery)