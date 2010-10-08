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
	//実行
    $.fn.jdtMdnStrongEnter = function() 
    {
		//入力オブジェクト
		var tarObj = $(this);
		
		//値比較用
		var temp = "";
		
		//イメージ表示管理ハンドラー
		var handler = imageHandler();
		
		//タイマーオブジェクト
		var timer; 
		
		//イベント設定
		$(this)
		.focus( function()
		{
			//タイマー開始
			timer = setInterval( function()
			{
				var val = $(tarObj).val();
				if ( temp != val )
				{
					handler.view( Type.Kacha );
				} 
				temp = val;
			}, 100 );
		})	
		.blur( function()
		{
			//タイマーキャンセル
			clearInterval( timer );
		})
		.keyup( function(e) 
		{
			//エンター判定
			var keyCode = e.keyCode;
			if ( keyCode == 13 )
			{
				handler.view( Type.nTaaan );
			}	
		})
		.keydown( function(e)	
		{
			//使えなかった。
			
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
	
	
	//タイプ
	var Type = 
	{
		Kacha:1,
		nTaaan:2,
	}
	
	//表示ハンドラー
	var imageHandler = function ()
	{
		//超手抜きのしるし1
		var overlay = $( '<div id="kacha"><img src="image/kacha.png" alt=""></div>' );
		overlay.appendTo( $("body") );
	
		//超手抜きのしるし2
		var overlay2 = $( '<div id="ntaaan"><img src="image/ntaaan.png" alt=""></div>' );
		overlay2.appendTo( $("body") );	

		//カチャ表示
		var _kacha = $( "#kacha" );
		
		//ッターン表示
		var _ntaaan = $( "#ntaaan" );
		
		//表示範囲
		var p_getMaxPos = function ()
				{
					var max = {x:0,y:0};
					//表示画面領域の取得
					max.x = $( document ).height(); 
					max.y = document.documentElement.clientWidth;
					return max;
				} ;

		
		//ランダム関数
		var p_getRandamPos = function( xMax, yMax )
		{
			var pos = {x:0,y:0}
			pos.x = Math.floor (Math.random () * xMax) + 1;
			pos.y = Math.floor (Math.random () * yMax) + 1;
			return pos;
		};
		
		//ハンドラーオブジェクト
		var that = {};
		
		//表示メソッド
		that.view = function ( type )
		{
			var max = p_getMaxPos();
			var pos;
			if ( type == 1 )
			{
				//表示位置
				pos = p_getRandamPos( max.x - $(_kacha).width(), max.y - $(_kacha).height() );
				
				//表示			
				$(_kacha).stop().show().css( { "opacity":1.0,"top":pos.x,"left":pos.y } ).fadeTo( 300, 0.0 );	
			}
			else if( type == 2 )
			{
				//表示位置
				pos = p_getRandamPos( max.x - $(_ntaaan).width(), max.y - $(_ntaaan).height() );
				
				//表示
				$(_ntaaan).stop().show().css( { "opacity":1.0,"top":pos.x,"left":pos.y } );
				
				//余韻を残す
				setTimeout( function(){ $(_ntaaan).fadeTo( 400, 0.0 ); }, 500 );
			}
		}
		
		return that;

	};
    
})(jQuery)