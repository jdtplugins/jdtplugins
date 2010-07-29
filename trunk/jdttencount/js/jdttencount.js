
(function($) 
{
 	var interval = 10;
	$.fn.jdtTenCount = function(options) 
	{
		$("select").hide();
		var height = $('body:first').height();
		var width = document.documentElement.clientWidth;
		$('#overlay').height(height).width(width).show().fadeTo( 500, 0.8, function() 
		{
			
			if (navigator.userAgent.match(/AppleWebKit\/\d.+Safari\/\d.+/)) {
				var scrollTop = document.body.scrollTop;
			} else {
				var scrollTop = document.documentElement.scrollTop;
			}
			var top = (document.documentElement.clientHeight - $('#layer_info').height()) / 2 + scrollTop;
			var left = ($('html').width() - $('#layer_info').width()) / 2;
			$('#layer_info').css('top', top).css('left', left).show();

			var Start=new Date();
	
			setInterval(function()
			{
				var Stop = new Date();			
				var span = Stop.getTime() - Start.getTime();
				var	sec = Math.floor( ( span / 1000 ) % 60 );
				var ms = span % 1000;
				var time = ( "0"+ sec ).slice(-2) + ":" + ("00"+ ms).slice(-3);
				$(".count").html( time );
				if ( sec >= 10 ) closeWin();
			}, interval);
		});
	}
	
	function closeWin()
	{
  		window.open('about:blank','_self').close();
	}
})(jQuery)