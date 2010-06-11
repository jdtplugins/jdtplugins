/**
 * jDTneverClick
 *
 * @author        nori (http://twitter.com/5509)
 * @copyright     (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @lastmodified  2010/06/09 21:03
 */
(function($) {

	$.fn.jdtNeverClick = function(options) {
		var c = $.extend({
			listener: 'click dblclick contextmenu',
			dialog: true,
			message: 'ちょっ、まじクリックとかありえないんですけど。'
		}, options);
		
		$(this).bind(c.listener, function() {
			if ( c.dialog ) {
				alert( c.message );
			}
			return false;
		});
	}

})(jQuery);