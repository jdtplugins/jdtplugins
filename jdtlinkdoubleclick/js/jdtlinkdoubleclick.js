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

	$.fn.jdtLinkDouleClick = function()
	{
		
		
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
				
})(jQuery)