/**
 * jDTLinkDoubleClick
 *
 * @version      $Rev$
 * @author       kamiyam (http://twitter.com/kamiyam)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdtlinkdoubleclick/index.html
 *
 * $Date$
 */
(function($) 
{
	$.fn.jdtLinkDouleClick = function( options )
	{
			
        // 初期値を設定
        var defaults = (
		{
            "isAnimate" : false,
        });

        // オプション値でオーバーライド
        var k = $.extend( defaults, options );
			
		if ( k.isAnimate )
		{
			beforeFunction();
		};
			
		//a属性
		this.each(function() 
		{
			//リンクキャンセル
			$(this).attr("onClick","return false;");
			
			//リンク先取得
			var href = $(this).attr("href");
				
			//ダブルクリックの動作設定
			$(this).dblclick(function () 
			{
				document.location = href;
			});
		});
		
		//jQueryオブジェクトを返す
		return ( this );

	};
	
	//サファリ判定
	var isSafari = navigator.userAgent.match( /AppleWebKit\/\d.+Safari\/\d.+/ ) != null;
	
	var overlay = "#overlay";
	var surface = "#overlay_surface";
	var inner = ".overlay_inner";
	
	///アニメーション
	function beforeFunction()
	{
		//IE対策
        $( "select" ).hide();
    
        //表示画面領域の取得
        var height = $( document ).height(); 
        var width = document.documentElement.clientWidth;	
			
		//OverLayフェードイン and 実行処理
		$( overlay ).height( height ).width( width ).show().fadeTo( 1000, 0.8, function() 
		{

			//表示領域設定
			var scrollTop = isSafari ? document.body.scrollTop : document.documentElement.scrollTop ;
			
			var top = ( document.documentElement.clientHeight - $( surface ).height() ) / 2 + scrollTop;
			var left = ( $( "html" ).width() - $( surface ).width() ) / 2;

			//文字表示領域
			$( surface ).css( "top", top ).css( "left", left ).show();
						
			//表示
			$( inner ).html( "おや…" );
			
			var msgs = new Array( 	"リンク達の様子がおかしいぞ。ま、まさか・・・",
									"ごごごごごごごごごごごごごごごごごごごごごっ",
									"すべてのリンクがダブルクリックリンクになった。！！" 
								);
						
			///文字ストリーミング
			stringStreaming( $( inner ), msgs, 0, 3000 );
			
		});
	};
	
	//アニメーション文字出力
	function stringStreaming( disp, msgGrp, index, deley, eventFunc )
	{
		setTimeout( function()
		{
			//表示
			disp.html( msgGrp[index] );
							
			if ( msgGrp[ index + 1 ] != undefined )
			{	
				stringStreaming( disp, msgGrp, index + 1, deley );
			}
			else
			{
				setTimeout( function()
				{
					//eventFunc;
					$( surface ).hide();
					$( overlay ).css( "background", "#fff" ).show().fadeTo( 1000, 0 );
					
				}, deley );
			}
		}, deley );
	};
	
	
})(jQuery)