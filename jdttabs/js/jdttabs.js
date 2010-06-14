/**
 * jDTTabs
 *
 * @author       nori (http://twitter.com/5509)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdttabs/index.html
 *
 * $Date: 2010-06-15 01:20
 */
(function($) {

	$.fn.jdtTabs = function(options) {
		var c = $.extend({
				message: 'このタブの中身はいただいた。'
			}, options),
			tabs = $('.tab li a', this),
			tabSection = [],
			active = null;
						
		for ( var i=0; i<tabs.length; i++ ) {
			tabSection.push($(tabs[i].hash));
			$(tabs[i].hash).hide();
			if ( /active/.test(tabs[i].className) ) {
				active = tabs[i].hash;
			}
		}
		
		tabSection[Math.floor(Math.random() * tabSection.length)].html(c.message);
		
		if ( active == null ) {
			active = tabs[0].hash;
			$(tabs[0]).addClass('active');
		}
		$(active).show();
		
		$(tabs).click(function() {
			var $thisID = this.hash;
			for ( var i=0; i<tabSection.length; i++ ) {
				tabSection[i].hide();
			}
			$(tabs).removeClass('active');
			$(this.hash).show();
			$(this).addClass('active');
			
			return false;
		});
			
	}

})(jQuery)