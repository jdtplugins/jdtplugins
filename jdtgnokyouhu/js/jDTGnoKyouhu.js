/**
 * jDTTabs
 *
 * @Version      $Rev$
 * @author       yusuke.nakanishi (http://yusukenakanishi.com/)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jDTGnoKyouhu/index.html
 *
 * $Date$
 */
 
(function($) {

    // 移動範囲
    var maxHeight = $(window).height() - 200;
    var minHeight = 100;
    var maxWidth = $(window).width() - 200;
    var minWidth = 100;
        
    // 座標位置
    var topValue, leftValue;
    var position = { "x":0, "y":0 };
        
    // setTimeout用の関数
    var GInterval;
    
    // 初期設定
    var GAreaImg, GAnimateMs;
    
    var GProduce = function(){
        this.elem;
        this.setup();
        this.GTimer();
    }
    
    GProduce.prototype = {
    
        // 画像の配置
        setup: function(){
            this.elem = $('<div class="GArea"><img src="img/cockroach.gif" alt="img_01" class="GImg" /><img src="img/mosaic.gif" alt="mosaic" class="GMosaicImg" /></div>');
            $(document.body).append(this.elem);
            var self = this;
            self.firstPosition();
        },
        
        // 最初の表示位置をランダムに
        firstPosition: function(){
            topValue = Math.floor(Math.random()*(maxHeight-minHeight))+minHeight; // minHeight〜maxHeightまでの乱数
            leftValue = Math.floor(Math.random()*(maxWidth-minWidth))+minWidth; // minWidth〜maxWidthまでの乱数
            this.elem.children('img').css({ top: topValue + 'px', left: leftValue + 'px' }).fadeIn('slow');
            if($('img#GMosaicButton').hasClass('on')) {
                $('img#GMosaicButton').addClass('on');
                $('img.GMosaicImg').css( "opacity", "0.9" );
            } else {
                $('img.GMosaicImg').hide();
            }
            
        },
        
        // 繰り返し
        GTimer: function(){
        
            // 現在位置を判定
            var GPotision = this.elem.children('img.GImg').offset();
            if(GPotision.left < minWidth) {
                position["x"] = -1;
            } else if(GPotision.left > maxWidth) {
                position["x"] = 1;
            } else {
                position["x"] = 0;
            };
            if(GPotision.top < minHeight) {
                position["y"] = -1;
            } else if(GPotision.top > maxHeight) {
                position["y"] = 1;
            } else {
                position["y"] = 0;
            };
            
            // 画像のアニメーション
            function bugsAction(x, y) {
                
                // 移動先の座標を設定
                var halfHeight = Math.floor($(window).height() / 2);
                var halfWidth = Math.floor($(window).width() / 2);
                var topRandom = Math.floor(Math.random()*100)+50;
                var leftRandom = Math.floor(Math.random()*100)+50;
                if(x == -1) {
                    leftValue = Math.floor(Math.random()*(halfWidth-minWidth))+minWidth;
                } else if(x == 1) {
                    leftValue = Math.floor(Math.random()*(maxWidth-halfWidth))+halfWidth;
                } else {
                    var k = Math.floor(Math.random()*2);
                    k == 0 ? leftValue += leftRandom : leftValue -= leftRandom;
                };
                if(y == -1) {
                    topValue = Math.floor(Math.random()*(halfHeight-minHeight))+minHeight;
                } else if(y == 1) {
                    topValue = Math.floor(Math.random()*(maxHeight-halfHeight))+halfHeight;
                } else {
                    var k = Math.floor(Math.random()*2);
                    k == 0 ? topValue += topRandom : topValue -= topRandom;
                };
            }
            bugsAction(position["x"], position["y"]);
        
            function rotateAction(rotateValue, GImgElem, GAreaElem) {
                
                // 画像の回転
                GImgElem.css({
                    "-webkit-transform": "rotate(" + rotateValue + "deg)",
                    "-moz-transform": "rotate(" + rotateValue + "deg)",
                    "transform": "rotate(" + rotateValue + "deg)"
                });
                
                // アニメーション
                GAnimateMs = Math.floor(Math.random()*2000)+1500;
                GAreaElem.animate({
                    top: topValue + 'px',
                    left: leftValue + 'px'
                }, GAnimateMs);
            }
            
            var GImgElem = this.elem.children('img.GImg');
            var GAreaElem = this.elem.children('img');
            
            // 画像を進行方向に向ける（回転）
            var topRotate = topValue - Math.floor(GPotision.top);
            var leftRotate = leftValue - Math.floor(GPotision.left);
            if(topRotate > 0 && leftRotate > 0) { rotateAction(135, GImgElem, GAreaElem); } // ++, 右下
            if(topRotate > 0 && leftRotate == 0) { rotateAction(180, GImgElem, GAreaElem); } // +0, 下
            if(topRotate > 0 && leftRotate < 0) { rotateAction(225, GImgElem, GAreaElem); } // +-, 左下
            if(topRotate < 0 && leftRotate > 0) { rotateAction(45, GImgElem, GAreaElem); } // -+, 右上
            if(topRotate < 0 && leftRotate == 0) { rotateAction(0, GImgElem, GAreaElem); } // -0, 上
            if(topRotate < 0 && leftRotate < 0) { rotateAction(315, GImgElem, GAreaElem); } // --, 左上
            if(topRotate == 0 && leftRotate > 0) { rotateAction(90, GImgElem, GAreaElem); } // 0+, 右
            if(topRotate == 0 && leftRotate < 0) { rotateAction(270, GImgElem, GAreaElem); } // 0-, 左
            
            // 繰り返し
            var self = this;
            GInterval = setTimeout(function() {
                self.GTimer();
            }, GAnimateMs);
            
            // #bugsStopをクリックした際の動作
            $('img#GDeleteButton').click(function(){
                clearTimeout(GInterval);
                $('img.GImg').attr('src','img/cockroach_die.gif');
                GNumber = 1;
                $('div.GArea').delay(500).fadeOut();
                $('div.GArea:hidden').empty();
                $('').replaceAll('div.GArea:hidden');
            });
        
        }
        
    }
    
    $(function(){
        
        // GMenuの追加
        var addGMenu = $('<ul id="GMenu"><li><img src="img/menu_01.gif" alt="menu_01" id="GProduceButton" /></li><li><img src="img/menu_02.gif" alt="menu_02" id="GMosaicButton" /></li><li><img src="img/menu_03.gif" alt="menu_03" id="GDeleteButton" /></li></ul>');
        $(document.body).append(addGMenu);
        
        // 最初に1G表示
        GProduceFirst = new GProduce();
        
        // 青色のボタンを押した時
        var GNumber = 1;
        $('img#GProduceButton').click(function(){
            var newGProduce = 'GProduce';
            newGProduce += String(GNumber);
            newGProduce = new GProduce();
            GNumber++;
        });
        
        // 黄色のボタンを押した時
        $('img#GMosaicButton').click(function(){
            if($(this).hasClass('on')) {
                $(this).removeClass('on');
                $('img.GMosaicImg').hide();
            } else {
                $(this).addClass('on');
                $('img.GMosaicImg').css( "opacity", "0.9" ).show();
            }
        });
        
    });

})(jQuery)