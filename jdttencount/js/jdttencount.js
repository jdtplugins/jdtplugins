/**
 * jDTTenCount
 *
 * @version      $Rev$
 * @author       kamiyam (http://twitter.com/kamiyam)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdttencount/index.html
 *
 * $Date$
 */
(function($) 
{
    //カウントダウン更新スパン
    var interval = 11;
    
    //10カウント
    var limitCount = 10 * 1000;
    
    //表示エリア定義
    var overlay = "#overlay";
    var countInfo = "#count_info";
    var inner = ".inner";

    //表示メッセージ定義
    var gaoo = "10秒数えたら閉じちゃうんだぞー (｢・ω・)｢ ｶﾞｵｰ ";
    var owata = "しゅーりょー！！";
    
    //10カウント実行
    $.fn.jdtTenCount = function() 
    {
        //IE対策？
        $( "select" ).hide();
    
        //表示画面領域の取得
        var height = $( document ).height();        
        var width = document.documentElement.clientWidth;
        
        //表示開始遅延
        setTimeout ( function()
        {
            //OverLayフェードイン and 実行処理
            $( overlay ).height( height ).width( width ).show().fadeTo( 1000, 0.8, function() 
            {
                //サファリ判定
                if ( navigator.userAgent.match( /AppleWebKit\/\d.+Safari\/\d.+/ ) )  
                {
                    var scrollTop = document.body.scrollTop;
                }
                else
                {
                    var scrollTop = document.documentElement.scrollTop;
                }
                
                //表示領域設定
                var top = ( document.documentElement.clientHeight - $( countInfo ).height() ) / 2 + scrollTop;
                var left = ( $( "html" ).width() - $( countInfo ).width() ) / 2;
                
                //文字表示領域
                $( countInfo ).css( "top", top ).css( "left", left ).show();
                
                //(｢・ω・)｢ ｶﾞｵｰ表示
                $( inner ).html( gaoo );
                
            });
            
            //画面上部移動時の表示高さ
            height = 100;
            
            //Overlay画面上部移動遅延
            setTimeout ( function()
            {
                //移動前準備
                $( countInfo ).animate( { top:"0px" }, "slow" ).fadeTo( 500, 0.8 );
                $( inner ).html( "" );
                
                //Overlayリサイズ（画面上部へ移動）、さらに透過を薄く
                $( overlay ).height( height ).width( width ).fadeTo( 500, 0.4, function() 
                {
                    //文字サイズ変更
                    $( inner ).css( "font-size","50px");
                    
                    //スタート時間
                    var Start=new Date();
                    
                    //カウントダウン表示更新
                    setInterval( function()
                    {
                        //インターバル計測
                        var Stop = new Date();
                        
                        //カウントダウン残（みり秒） 
                        var count = limitCount - ( Stop.getTime() - Start.getTime() );
                        
                        //秒残り
                        var sec = Math.floor( ( count / 1000 ) % 60 );
                        
                        //ミリ秒残り
                        var ms = count % 1000;
                        
                        //表示                        
                        var time = sec + ":" + ( "00" + ms).slice( -3 );
                        $( inner ).html( time );
                        
                        //ゼロ(・ω・)？
                        if ( sec < 0 ) 
                        {                           
                            //終了表示
                            $( inner ).html( owata );
                            
                            //画面クローズ待ち
                            setTimeout ( function()
                            {
                                //画面クローズ（アラート回避）
                                window.open( "about:blank", "_self" ).close();
                                
                            }, 1000 );//クローズ待ち時間
                        }
                    }, interval );//カウントダウン表示更新インターバル
                
                } );
            }, 2500 );//画面上部移動待ち時間
            
        }, 1000);//(｢・ω・)｢ ｶﾞｵｰ表示待ち時間
        
        return ( this );
    }
    
})(jQuery)