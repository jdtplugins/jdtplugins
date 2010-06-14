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
				],
				special: false
			}, options);
			
		$(this).click(function() {
			if ( !$(this).is(':checkbox') ) return false;
			var $name = $(this).attr('name');
			
			if ( !c.special ) {
				if ( !$(this).is(':checked') ) {
					$('input[name="'+ $name +'"]').removeAttr('checked');
				} else {
					$('input[name="'+ $name +'"]').attr('checked','checked');
				}
				
				alert('チェックボックスたち: 「' + c.message[Math.floor(Math.random() * c.message.length)] + '」');
			} else {
				if ( !$(this).is(':checked') ) {
					$('input[name="'+ $name +'"]').removeAttr('checked');
				} else {
					var sp = $('input[name="'+ $name +'"]').not(this);
					for ( var i=0; i<sp.length; i++ ) {
						if ( i==(sp.length-1) ) {
							alert('じゃあ俺も!');
							$(sp[i]).attr('checked','checked');
							
							alert('どうぞどうぞ');
							$(this).removeAttr('checked');
							for ( var j=0; j<sp.length; j++ ) {
								if ( j!=(sp.length-1) ) {
									$(sp[j]).removeAttr('checked');
								}
							}
						} else {
							alert('チェックボックス「俺も！」');
							$(sp[i]).attr('checked','checked');
						}	
					}	
				}	
			}
		});
	}

})(jQuery)