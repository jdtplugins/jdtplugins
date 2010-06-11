/**
 * jDTkoikiTitle
 *
 * @author        nori (http://twitter.com/5509)
 * @copyright     (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @lastmodified  2010/06/09 21:03
 */
(function($) {

	$.jdtKoikiTitle = function() {
		var titles = [
			// メロドラマ系
			'俺とお前の',
			'今日からお前も',
			'夕暮れ時の',
			'波打ち際の',
			'愛してるよ…',
			'お前の愛した'
			// ヒーローもの系
			// 刑事もの系
			// 青春もの系
		];
		
		document.title = titles[Math.floor( Math.random() * titles.length )] + document.title;
	}

})(jQuery);