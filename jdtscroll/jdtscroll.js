/**
 * jDTScroll
 *
 * @version      $Rev$
 * @author       rew (http://twitter.com/rewish)
 * @copyright    (c) 2010 誰が使うの？何の役にも立たないjQueryプラグイン
 * @license      The MIT License
 * @link         http://jdtplugins.googlecode.com/svn/trunk/jdtscroll/example.html
 *
 * $LastChangedBy$
 * $Date$
 */
(function($) {

	$.fn.dtScroll = function(speed, message) {
		message = $.extend({
			yada: '\u30b9\u30af\u30ed\u30fc\u30eb\u30d0\u30fc'
			    + '\u300c\u50cd\u304b\u305b\u3059\u304e\uff01'
			    + '\u30b9\u30c8\u30e9\u30a4\u30ad\uff01\u300d',
			muri: '\u30b9\u30af\u30ed\u30fc\u30eb\u30d0\u30fc\u300c'
			    + '\u4eca\u65e5\u306f\u3053\u306e\u8fba\u3067\u52d8'
			    + '\u5f01\u3057\u3068\u3044\u305f\u308b\u3002\u300d'
			    + '\n(%muriPx%px\u304f\u3089\u3044\u305a\u308c\u305f)',
			muimi: '\u65e2\u306b\u305d\u306e\u30dd\u30b8\u30b7\u30e7\u30f3'
			     + '\u306f\u78ba\u4fdd\u3057\u3066\u308b\u305c\uff1f'
		}, message);
		var target = $('html, body'), isMuri, muriPx, fatigue = 0,
		    easing = ['easeInElastic', 'easeOutElastic', 'easeInOutElastic']
		return this.each(function() {
			var self = $(this), href = self.attr('href');
			if (!href || !/#/.test(href)) return;
			var uzaTop = $('#' + href.split('#')[1]).position().top;
			self.click(function() {
				var scrollTop = document.body.scrollTop;
				if (uzaTop == scrollTop) {
					alert(message['muimi']);
					return false;
				}
				if (isMuri = Math.floor(Math.random() * 5) === 1) {
					muriPx = Math.floor(Math.random() * Math.abs(scrollTop - uzaTop));
					uzaTop += scrollTop <= uzaTop ? -muriPx : muriPx;
				}
				if ((++fatigue) > Math.floor(Math.random() * 5) + 2) {
					fatigue = 0;
					alert(message['yada']);
					return false;
				}
				target.stop(true, true).animate(
					{scrollTop: uzaTop},
					(speed || 2000),
					easing[Math.floor(Math.random() * 3)],
					function() {
						if (!isMuri) return;
						isMuri = false;
						alert(message['muri'].replace(/%muriPx%/, muriPx));
					}
				);
				return false;
			});
		});

	}

	/*
	 * jQuery Easing v1.3 - http://gsgd.co.uk/sandbox/jquery/easing/
	 *
	 * Uses the built in easing capabilities added In jQuery 1.1
	 * to offer multiple easing options
	 *
	 * TERMS OF USE - jQuery Easing
	 *
	 * Open source under the BSD License.
	 *
	 * Copyright (c) 2008 George McGinley Smith
	 * All rights reserved.
	 *
	 * Redistribution and use in source and binary forms, with or without modification,
	 * are permitted provided that the following conditions are met:
	 *
	 * Redistributions of source code must retain the above copyright notice, this list of
	 * conditions and the following disclaimer.
	 * Redistributions in binary form must reproduce the above copyright notice, this list
	 * of conditions and the following disclaimer in the documentation and/or other materials
	 * provided with the distribution.
	 *
	 * Neither the name of the author nor the names of contributors may be used to endorse
	 * or promote products derived from this software without specific prior written permission.
	 *
	 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
	 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
	 * MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE
	 *  COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
	 *  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE
	 *  GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
	 * AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
	 *  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED
	 * OF THE POSSIBILITY OF SUCH DAMAGE.
	 *
	 */
	$.extend($.easing, {
		easeInElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		},
		easeOutElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d)==1) return b+c;  if (!p) p=d*.3;
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
		},
		easeInOutElastic: function (x, t, b, c, d) {
			var s=1.70158;var p=0;var a=c;
			if (t==0) return b;  if ((t/=d/2)==2) return b+c;  if (!p) p=d*(.3*1.5);
			if (a < Math.abs(c)) { a=c; var s=p/4; }
			else var s = p/(2*Math.PI) * Math.asin (c/a);
			if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
			return a*Math.pow(2,-10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )*.5 + c + b;
		}
	});

})(jQuery)