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

	$.fn.jdtRollover = function(suffix, ikioi) {
		suffix = suffix || '_on';
		ikioi  = ikioi || 50;
		var nodes = this;

		return nodes.not('[src*="'+ suffix +'."]').each(function() {
			var img = $(this);
			var src = img.attr('src');
			var _on = [
				src.substr(0, src.lastIndexOf('.')),
				src.substring(src.lastIndexOf('.'))
			].join(suffix);

			var target = img, queue, isOn = false;

			$('<img/>').attr('src', _on);

			img.hover(
				function() {
					if (isOn = !isOn) {
						target.attr('src', _on);
					} else {
						target.attr('src', src);
						target = $(nodes[Math.floor(Math.random() * nodes.length)]);
					}
					queue = setTimeout(arguments.callee, ikioi);
				},
				function() {
					clearTimeout(queue);
					target.attr('src', src);
				}
			);
		});
	}

})(jQuery)