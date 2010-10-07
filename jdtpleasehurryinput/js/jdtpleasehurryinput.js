/**
 * jDTPleaseHurryInput
 *
 * @version      $Rev: 144 $
 * @author       kamiyam (http://twitter.com/kamiyam)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdtpleasehurryinput/index.html
 *
 * $Date: 2010-07-29 18:37:19 +0900 $
 */
(function($) 
{
    //5カウント
    var limitCount = 5 * 1000;
    
	//実行
    $.fn.jdtPleaseHurryInput = function() 
    {
 		$(this).each( function() 
		{
			$(this).focus( function()
				{
					var that = this;
					var obj = setTimeout( function ()
									{
										$(that).attr("disabled", "disabled");
									},
									limitCount  );
					$(this).blur( function(){ clearTimeout( obj ); });
				} );
		});
		
		return this;
    };
    
})(jQuery)