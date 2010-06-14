/**
 * jDTSynergyCheckbox
 *
 * @author       nori (http://twitter.com/5509)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdtsynergycheckbox/index.html
 *
 * $Date: 2010-06-14 14:20
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
			var $name = $(this).attr('name'),
				group = $('input[name="'+ $name +'"]');
				
			group.each(function(i) {
				group[i].nameData = i+1;
			});
			
			if ( c.special ) {
				if ( !$(this).is(':checked') ) {
					group.removeAttr('checked');
				} else {
					group.attr('checked','checked');
				}
				
				alert('チェックボックスたち: 「' + c.message[Math.floor(Math.random() * c.message.length)] + '」');
			} else {
				if ( !$(this).is(':checked') ) {
					group.removeAttr('checked');
				} else {
					var sp = group.not(this);
					for ( var i=0; i<sp.length; i++ ) {
						if ( i==(sp.length-1) ) {
							alert('チェックボックス' + sp[i].nameData + '「じゃあ俺も!」');
							$(sp[i]).attr('checked','checked');
							
							alert('チェックボックス1～' + sp.length + '「どうぞどうぞ」');
							$(this).removeAttr('checked');
							for ( var j=0; j<sp.length; j++ ) {
								if ( j!=(sp.length-1) ) {
									$(sp[j]).removeAttr('checked');
								}
							}
						} else {
							alert('チェックボックス' + sp[i].nameData + '「俺も！」');
							$(sp[i]).attr('checked','checked');
						}	
					}	
				}	
			}
		});
	}

})(jQuery)