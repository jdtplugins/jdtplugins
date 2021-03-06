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
				animateTo: 20,
				/*animateTo: {
					width: 32,
					height: 32
				},*/
				closeImgSrc: 'img/closebox.png',
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

		if ( !$('#dtLightBoxLayer') || $('#dtLightBoxLayer').length<1 ) {
			$('body').append([
				'<div id="dtLightBoxLayer"/>',
				'<div id="dtLightBoxContainer">',
					'<div id="dtLightBoxImage"/>',
					'<img id="dtLightBoxClose" src="' + c.closeImgSrc + '" alt="Close" />',
				'</div>'
			].join(''));
		}

		var $layer = $('#dtLightBoxLayer').hide(),
			$container = $('#dtLightBoxContainer').hide(),
			$close = $('#dtLightBoxClose').hide(),
			$image = $('#dtLightBoxImage').hide(),
			closeDtLightBox = function() {
				$layer.fadeOut();
				$container.fadeOut();
				$close.hide();
			}

		$layer.css({
			width: dEW+'px',
			height: dEH+'px',
			position: 'fixed',
			top: 0,
			left: 0
		}).click(closeDtLightBox);
		$close.click(closeDtLightBox);

		$this.click(function() {
			return false;
		});

		$this.click(function() {
			$layer.css('opacity', c.bgLayerOpacity).show();
			$image.empty();
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
				var animateToSize = {
						width: img.width * c.animateTo/100,
						height: img.height * c.animateTo/100
					}/*,
					closeAnimateToSize = {
						width: parseInt($close.width()) * c.animateTo/100,
						height: parseInt($close.height()) * c.animateTo/100
					}
					console.log(closeAnimateToSize.width);*/
				$container.animate({
					marginTop: -img.height/2,
					marginLeft: -img.width/2,
					width: img.width,
					height: img.height
				},{
					duration: 400,
					easing: 'swing',
					complete: function() {
						$close.fadeIn();
						$image.append(img).fadeIn('normal', function() {
							/*$close.animate({
								marginTop: -closeAnimateToSize.height/2,
								marginLeft: -closeAnimateToSize.width/2,
								width: closeAnimateToSize.width,
								height: closeAnimateToSize.height
							},{
								duration: 400,
								easing: 'swing'
							});*/
							$(img).animate({
								width: animateToSize.width,
								height: animateToSize.height
							},{
								duration: 400,
								easing: 'swing'
							});
							$container.animate({
								marginTop: -animateToSize.height/2,
								marginLeft: -animateToSize.width/2,
								width: animateToSize.width,
								height: animateToSize.height
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