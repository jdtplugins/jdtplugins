/**
 * jDTForeverShikaku
 *
 * @version     $Rev: 194 $
 * @author      kamiyam (http://twitter.com/kamiyam)
 * @copyright   (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license     The MIT License
 * @link        http://jdtplugins.googlecode.com/svn/trunk/jdtForeverShikaku/index.html
 *
 * $Date: 2010-10-12 09:10:07 +0900 (火, 12 10 2010) $
 */
(function($)
{
	//実行
    $.fn.jdtForeverShikaku = function( options )
    {
        // 初期値を設定
        var defaults = {};

        // オプション値でオーバーライド
        var k = $.extend( defaults, options );

		recursion( $(this) );
	
		return ( this );
    };

	function recursion( target )
	{
		if ( $(target).css("display") === "block" )
		{
			$(target).css({
				"border-radius":"0px",
				"-moz-border-radius":"0px",
				"-webkit-border-radius": "0px"
				});
		}
		
		var nodes = $(target).children();
		var count = nodes.size();

		if ( count == 0 )	return;

		for( var i = 0; i < count ; i++ )
		{
			recursion( nodes[i] );
		}
	}
	
})(jQuery)