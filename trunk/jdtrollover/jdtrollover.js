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
			var img = $(this), src = [img.attr('src')];
			src[1] = [
				src[0].substr(0, src[0].lastIndexOf('.')),
				src[0].substring(src[0].lastIndexOf('.'))
			].join(suffix);

			$('<img/>').attr('src', src[1]);

			var target = img, queue, isOn = false;

			img.hover(
				function() {
					target.attr('src', src[+(isOn = !isOn)]);
					queue = setTimeout(arguments.callee, ikioi);
				},
				function() {
					clearTimeout(queue);
					target.attr('src', src[0]);
				}
			);
		});
	}

	function getTarget(nodes) {
		if (Math.floor(Math.random() * 5) !== 1) return;
		return $(nodes[Math.floor(Math.random() * nodes.length)])
	}


})(jQuery)