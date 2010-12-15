/**
 * jDTElementVanish
 *
 * @version     $Rev: 194 $
 * @author      kamiyam (http://twitter.com/kamiyam)
 * @copyright   (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license     The MIT License
 * @link        http://jdtplugins.googlecode.com/svn/trunk/jdtElementVanish/index.html
 *
 * $Date: 2010-10-12 09:10:07 +0900 (火, 12 10 2010) $
 */
(function($)
{
	//マーカーclass名
	var markerClass = "jdtElementVanishMarker";
	
	//ターゲットclass名
	var rootClass = "jdtElementVanishRoot";
	
	// 初期値
    var defaults = { "interval" : 1 * 1000, "animate" : 1 * 1000, "ie6only" : false };
	
	//setInterval実行関数
	var intFunc;
	
	//IE6判定
	var isIE6 = ( !jQuery.support.opacity &&
			!jQuery.support.style &&
			typeof document.documentElement.style.maxHeight === "undefined" );
	
	//実行
    $.fn.jdtElementVanish = function( options )
    {
        // 初期値を設定
        // オプション値でオーバーライド
        var conf = $.extend( defaults, options );

		if ( ! conf.ie6only )
		{
			proc( $( this ), conf );
		}
		else if ( isIE6 )
		{
			proc( $( this ), conf );
		}
		
		return ( this );
		
		//実行
		function proc( target, conf )
		{
			$( "span#title" ).animate( { opacity: "0" }, 20 * 1000 )
			
			$( target ).addClass( rootClass ); 
			
			intFunc = setInterval( function(){ recursion( $( target ) ); }, conf.interval );
		}
		
		//再帰
		function recursion( target )
		{
			if ( $( target ).hasClass( rootClass ) 
					&& $( target ).hasClass( markerClass ) )
			{
				clearInterval( intFunc );
				return;
			}

			var nodes = $( target ).children( ":not(." + markerClass + ")" );
			var count = nodes.size();
	
			if ( count == 0 )
			{
				$( target ).animate( { opacity: "0" }, conf.animate ).addClass( markerClass );
				return;
			}
			else
			{
				var randnum = Math.floor( Math.random() * count );
				recursion( nodes[randnum] );
			}
		}
    };
})(jQuery)