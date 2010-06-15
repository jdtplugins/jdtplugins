/**
 * jDTTabs
 *
 * @version      $Rev$
 * @author       nori (http://twitter.com/5509)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdttabs/index.html
 *
 * $Date$
 */
(function($) {

	$.fn.jdtTabs = function(options) {
		var c = $.extend({
				steal: 'このタブの中身はいただいた。',
				stole: 'ばっかもーん！そいつがルパンだー！'
			}, options),
			tabs = $('.tab li a', this),
			tabSection = [],
			active = null,
			activeIndex = null;
						
		for ( var i=0; i<tabs.length; i++ ) {
			tabSection.push($(tabs[i].hash));
			$(tabs[i].hash).hide();
			if ( /active/.test(tabs[i].className) ) {
				active = tabs[i].hash;
				acitveIndex = i;
			}
		}
		
		if ( active == null ) {
			active = tabs[0].hash;
			activeIndex = 0;
			$(tabs[0]).addClass('active');
		}
		
		var target = Math.floor(Math.random() * tabSection.length);
		if ( activeIndex == target && activeIndex == tabs.length-1 ) {
			target--;
		} else
		if ( activeIndex == target ) {
			target++;
		}
		$(tabs[target]).addClass('steal');
		tabSection[target].html(c.steal);
		
		$(active).show();
		
		$(tabs).click(function() {
			if ( /steal/.test(this.className) ) {
				for ( var i=0; i<tabSection.length; i++ ) {
					if ( this.hash != '#' + tabSection[i].attr('id') ) {
						tabSection[i].html(c.stole);
					}
				}
			}
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