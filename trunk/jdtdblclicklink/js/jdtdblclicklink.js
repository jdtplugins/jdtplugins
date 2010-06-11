/**
 * jDTdblclickLink
 *
 * @author        nori (http://twitter.com/5509)
 * @copyright     (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @lastmodified  2010/06/09 21:03
 */
(function($) {

	$.jdtDblclickLink = function() {	
		/*$('a').click(function() {
			return false;
		}).bind('dblclick', function() {
		});*/
		var anchors = document.getElementsByTagName('a');
		for ( var i=0; i<anchors.length; i++ ) {
			var click = anchors[i].onclick;
			console.log(anchors[i].onclick);
			anchors[i].ondblclick = click;
			anchors[i].onclick = function(){ return false; }
		}
	}

})(jQuery);