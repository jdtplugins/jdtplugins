/**
 * jDTLinkDoubleClick
 *
 * @version      $Rev$
 * @author       kamiyam
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
		$(this).each(function() 
		{
			$(this).attr("onClick","return false;");
			var href = $(this).attr("href");
				
			$(this).dblclick(function () 
			{
				document.location = href;
			});
		});

	};
				
})(jQuery)