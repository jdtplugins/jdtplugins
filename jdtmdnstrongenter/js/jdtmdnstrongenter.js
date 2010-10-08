/**
 * jDTMdnStrongEnter
 *
 * @version     $Rev: 175 $
 * @author      kamiyam (http://twitter.com/kamiyam)
 * @copyright   (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license     The MIT License
 * @link        http://jdtplugins.googlecode.com/svn/trunk/jdtmdnstrongenter/index.html
 *
 * $Date: 2010-10-07 16:38:35 +0900 (木, 07 10 2010) $
 */
(function($) 
{
	var viewArea;
	
	function initialize()
	{
			
	}
	
	//実行
    $.fn.jdtMdnStrongEnter = function( view ) 
    {
		var tarObj = $(this);
		var temp = "";
		
		var timer = setInterval( function()
		{
			if ( temp != $(tarObj).val() )
			{
				$(view).stop().html("カチャ").css( "opacity", 1.0 ).fadeTo( 300, 0.0 );	
			} 
			temp = $(tarObj).val();
		}, 100 );
		
		//
		$(this)
		.blur( function()
		{
			clearInterval( timer );
		})
		.keyup( function(e) 
		{
			var keyCode = e.keyCode;
			if ( keyCode == 13 )
			{
				$(view).stop().html("っターン！").css( "opacity", 1.0 );
				setTimeout( function(){ $(view).fadeTo( 300, 0.0 ); }, 300 );
			}	
		})
		.keydown( function(e) 
		{
//			var keyCode = e.keyCode;
//			if
//			( 	keyCode == 32 ||
//				keyCode == 106 ||
//				keyCode == 107 ||
//				keyCode == 226 ||
//				keyCode == 229 ||	//IMEon入力イベント
//			 	( 48 <= keyCode && keyCode >= 57 ) ||
//				( 65 <= keyCode && keyCode >= 90 ) ||
//				( 96 <= keyCode && keyCode >= 105 ) ||
//				( 109 <= keyCode && keyCode >= 111 ) ||
//				( 186 <= keyCode && keyCode >= 192 ) ||
//				( 219 <= keyCode && keyCode >= 222 )
//			)
//			{
//				$(view).stop().html("カチャ").css( "opacity", 1.0 ).fadeTo( 500, 0.0 );
//			}
		});
		
		
		return ( this );
    };
    
})(jQuery)