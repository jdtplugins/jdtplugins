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

	//$.fn.rollover =
	$.fn.jdtRollover = function(suffix, ikioi) {
		suffix = suffix || '_on';
		ikioi = ikioi || 1;

		var messages = {
			end: '\u30aa\u30d0\u7537\u300c\u672c\u65e5\u306e\u55b6\u696d\u306f'
			   + '\u7d42\u4e86\u3044\u305f\u3057\u307e\u3057\u305f\u3002\u300d',
			0  : '\u30ed\u30eb\u5b50\u300c\u3059\u3054\u3044\u52e2\u3044\u3067\u56de'
			   + '\u308b\u304b\u3089\u6c17\u3092\u4ed8\u3051\u3066\u3088\uff01\u300d',
			120: '\u30ed\u30eb\u5b50\u300c\u305d\u308d\u305d\u308d'
			   + '\u30af\u30ea\u30c3\u30af\u3057\u305f\u65b9\u304c'
			   + '\u3044\u3044\u3093\u3058\u3083\u306a\u3044\uff1f\u300d',
			180: '\u30ed\u30eb\u5b50\u300c\u826f\u3044\u56de\u8ee2\u3060'
			   + '\u304b\u3089\u773a\u3081\u3066\u3044\u305f\u3044\u306e'
			   + '\u306f\u308f\u304b\u308b\u3051\u3069\u306d\u3002\u300d',
			225: '\u30ed\u30eb\u5b50\u300c\u30fb\u30fb\u30fb\u300d',
			250: '\u30ed\u30eb\u5b50\u300c\u305d\u308d\u305d\u308d\u30af\u30ea\u30c3'
			   + '\u30af\u30fb\u30fb\u30fb\u304a\u306d\u304c\u30fb\u30fb\u307e\u3059\u300d',
			280: '\u30ed\u30eb\u5b50\u300c\u30ac\u30af\u30c3\u300d'
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

			var target = img, time = 0, fatigue = false, isOn = false,
			    height = img.height(), pos = img.position(), queue, message;

			if (height === 0) {
				height = img.parent().height();
			}

			img.hover(function() {
				if (fatigue) {
					return alert(messages['end']);
				}

				if (time in messages) {
					message = messages[time];
					balloon.css({
						top: (pos.top + height + 10),
						left: pos.left
					}).stop(true, true).fadeOut(700, function() {
						balloon.text(message).fadeIn(700);
					});
				}

				if (time >= 280) {
					return fatigue = true;
				}

				time += ikioi;
				target.attr('src', src[+(isOn = !isOn)]);
				queue = setTimeout(arguments.callee, time);

			}, function() {
				clearTimeout(queue);
				if (fatigue) {
					balloon.stop(true, true).delay(1000).fadeOut(500);
					return;
				}
				target.attr('src', src[0]);
				balloon.stop(true, true).fadeOut(500);
				time = 0;
			});
		});
	}

})(jQuery)