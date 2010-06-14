/**
 * jDTScroll
 *
 * @author       nori (http://twitter.com/5509)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdtscroll/example.html
 *
 * $Date: 2010-06-11 17:30:40 +0900 (Fri, 11 Jun 2010) $
 */
(function($) {

	$.fn.jdtSynergyCheckbox = function(options) {
		var c = $.extend({
				message: [
					'俺も！俺も！'
				]
			}, options);
			
		$(this).click(function() {
			if ( !$(this).is(':checkbox') ) return false;
			var $name = $(this).attr('name');

			if ( !$(this).is(':checked') ) {
				$('input[name="'+ $name +'"]').removeAttr('checked');
			} else {
				$('input[name="'+ $name +'"]').attr('checked','checked');
			}
			
			alert('チェックボックスたち: 「' + c.message[Math.floor(Math.random() * c.message.length)] + '」');
		});
	}

})(jQuery)