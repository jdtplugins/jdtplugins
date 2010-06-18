/**
 * jDTRollover
 *
 * @version      $Rev$
 * @author       rew (http://twitter.com/rewish)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdtrollover/example.html
 *
 * $LastChangedBy$
 * $Date$
 */
(function($) {

	$.fn.rollover = $.fn.jdtRollover = function(suffix, ikioi) {
		suffix = suffix || '_on';
		ikioi = ikioi || 1;

		var messages = {
			end: '\u672c\u65e5\u306e\u55b6\u696d\u306f\u7d42\u4e86\u3057\u307e\u3057\u305f',
			0  : '\u52e2\u3044\u306e\u3042\u308b\u30ed\u30fc\u30eb\u30aa'
			   + '\u30fc\u30d0\u30fc\u306f\u7f8e\u3057\u3044\uff01',
			100: '\u3053\u3053\u3092\u30af\u30ea\u30c3\u30af\uff01',
			150: '\u305d\u308d\u305d\u308d\u30af\u30ea\u30c3\u30af\u3057\u305f'
			   + '\u65b9\u304c\u826f\u3044\u3068\u601d\u3046\u3088\uff01',
			190: '\u3053\u3053\u3092\u30af\u30ea\u30c3\u30af\uff01',
			220: '\u3046\u304a\u304a\u304a\u304a\u3049\u3049\u3049\u304a\u304a\u304a'
			   + '\u3063\u3063\u3063\u3063\u3049\u304a\uff01\uff01\uff01\uff01',
			230: '\u307a\u3063\u305f\u3093'
		};

		var balloon = $('<div/>', {
			css: {
				display: 'none',
				position: 'absolute',
				padding: '10px 15px',
				backgroundColor: '#CCC'
			}
		});
		$('body').append(balloon);

		return this.not('[src*="'+ suffix +'."]').each(function() {
			var img = $(this), src = [img.attr('src')];
			src[1] = [
				src[0].substr(0, src[0].lastIndexOf('.')),
				src[0].substring(src[0].lastIndexOf('.'))
			].join(suffix);

			// Preload
			$('<img/>').attr('src', src[1]);

			var target = img, time = 0, fatigue = 0, isOn = false,
			    height = img.height(), pos = img.position(), queue, message;

			if (height === 0) {
				height = img.parent().height();
			}

			img.hover(function() {
				if (fatigue > 2) {
					return alert(messages['end']);
				}

				if (time in messages) {
					message = messages[time];
					balloon.css({
						top: (pos.top + height + 10),
						left: pos.left
					}).stop(true, true).fadeOut(700, function() {
						balloon.text('\u30ed\u30eb\u7537\u300c'+ message +'\u300d').fadeIn(700);
					});
				}

				if (time >= 230) {
					clearTimeout(queue);
					return fatigue = 3;
				}

				time += ikioi;
				target.attr('src', src[+(isOn = !isOn)]);
				queue = setTimeout(arguments.callee, time);

			}, function() {
				clearTimeout(queue);
				if (fatigue > 2) {
					balloon.stop(true, true).delay(1000).fadeOut(500);
					return;
				}
				target.attr('src', src[0]);
				balloon.stop(true, true).fadeOut(500);
				time = 0;
				fatigue++;
			});
		});
	}

})(jQuery)