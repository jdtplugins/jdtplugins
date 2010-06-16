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
				defaultSize: {
					width: 150,
					height: 150
				},
				animateTo: {
					width: 32,
					height: 32
				},
				bgLayerOpacity: .7
			}, options),
			$this = $(this),
			dE = document.documentElement,
			dEW = dE.clientWidth,
			dEH = dE.clientHeight;
			
		$(window).resize(function() {
			dEW = dE.clientWidth;
			dEH = dE.clientHeight;
		});
		
		if ( $('#dtLightBoxLayer') && $('#dtLightBoxLayer').length>0 ) {
		} else {
			$('body').append([
				'<div id="dtLightBoxLayer"/>',
				'<div id="dtLightBoxContainer">',
					'<div id="dtLightBoxClose"/>',
					'<div id="dtLightBoxImage"/>',
				'</div>',
				'<div id="getImageLayer"/>'
			].join(''));
		}
		
		var $layer = $('#dtLightBoxLayer').hide(),
			$container = $('#dtLightBoxContainer').hide(),
			$close = $('#dtLightBoxClose'),
			$image = $('#dtLightBoxImage').hide(),
			$imageLayer = $('#getImageLayer').css({
				height: 1,
				width: 1,
				overflow: 'hidden'
			});
			
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
			$layer.css('opacity', c.bgLayerOpacity).show();
			$container.show().css({
				marginTop: -c.defaultSize.height/2,
				marginLeft: -c.defaultSize.width/2,
				width: c.defaultSize.width,
				height: c.defaultSize.height,
				position: 'absolute',
				top: '50%',
				left: '50%'
			});
			
			var img = new Image();
			img.src = this.href;
			
			// when img.width & img.height > 0
			getImageTimer(img, function() {
				$container.animate({
					marginTop: -img.height/2,
					marginLeft: -img.width/2,
					width: img.width,
					height: img.height
				},{
					duration: 400,
					easing: 'swing',
					complete: function() {
						$image.append(img).fadeIn('normal', function() {
							$(img).animate({
								width: c.animateTo.width,
								height: c.animateTo.height
							},{
								duration: 400,
								easing: 'swing'
							});
							$container.animate({
								marginTop: -c.animateTo.height/2,
								marginLeft: -c.animateTo.width/2,
								width: c.animateTo.width,
								height: c.animateTo.height
							},{
								duration: 400,
								easing: 'swing'
							});
						});
					}
				});
			});

			return false;			
		});
	}
	
	function getImageTimer(img, callback) {
		var gotten = false,
			timer = setInterval(function() {
				// width & height gotten
				if ( img.width > 0 && img.height > 0 ) {
					clearInterval(timer);
					callback();
				}
			}, 10);
	}

})(jQuery)