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

	$.fn.jdtScroll = function(speed, message, easing) {
		// 普通の引数
		speed = (speed || 2000) / 2;

		// 隠し引数
		message = $.extend({
			yada: '\u30b9\u30af\u30ed\u30fc\u30eb\u30d0\u30fc'
			    + '\u300c\u50cd\u304b\u305b\u3059\u304e\uff01'
			    + '\u30b9\u30c8\u30e9\u30a4\u30ad\uff01\u300d',
			muri: '\u30b9\u30af\u30ed\u30fc\u30eb\u30d0\u30fc\u300c'
			    + '\u4eca\u65e5\u306f\u3053\u306e\u8fba\u3067\u52d8'
			    + '\u5f01\u3057\u3068\u3044\u305f\u308b\u3002\u300d'
			    + '\n(%muriPx%px\u304f\u3089\u3044\u305a\u308c\u305f)',
			muimi: '\u65e2\u306b\u305d\u306e\u30dd\u30b8\u30b7\u30e7\u30f3'
			     + '\u306f\u78ba\u4fdd\u3057\u3066\u308b\u305c\uff1f',
			naize: '\u305d\u306e\u300c\u3075\u3089\u3050\u3081'
			     + '\u3093\u3068\u300d\u306f\u5b58\u5728\u3057'
			     + '\u306a\u3044\u3088\u3046\u3060\u305c\uff1f'
		}, message);

		// 本当の隠し引数
		easing = easing || [
			'easeInElastic', 'easeOutElastic', 'easeInBack',
			'easeOutBack', 'easeInBounce', 'easeOutBounce'
		];

		var target = $('html, body'), isMuri, muriPx,
		    fatigue = 0, uzasaMax = easing.length - 1;

		return this.each(function() {
			var self = $(this), targetTop = null;
			try {
				targetTop = $('#' + self.attr('href').split('#')[1]).position().top;
			} catch(e) {}
			self.click(function() {
				target.clearQueue();

				// The Naize
				if (!targetTop) {
					alert(message['naize']);
					return false;
				}

				var scrollTop = document.body.scrollTop;

				// The Muimi
				if (targetTop === scrollTop) {
					alert(message['muimi']);
					return false;
				}

				// Murikamo?
				if (isMuri = rand(0, 3) === 1) {
					muriPx = rand(0, Math.abs(scrollTop - targetTop));
					targetTop += scrollTop <= targetTop ? -muriPx : muriPx;
				}

				// The Yada
				if ((++fatigue) > rand(2, 4)) {
					fatigue = 0;
					alert(message['yada']);
					return false;
				}

				// Boin Boin
				target.animate(
					{scrollTop: targetTop / 2},
					speed,
					easing[rand(0, uzasaMax)],
					function() {
						// Boin Boin
						target.animate(
							{scrollTop: targetTop},
							speed,
							easing[rand(0, uzasaMax)],
							function() {
								if (!isMuri) return;
								isMuri = false;
								// The Muri
								setTimeout(function() {
									alert(message['muri'].replace(/%muriPx%/, muriPx));
								}, 0);
							}
						);
					}
				);
				return false;
			});
		});
	}

	function rand(min, max) {
		return Math.floor(Math.random() * (max + 1)) + min;
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
		easeInBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*(t/=d)*t*((s+1)*t - s) + b;
		},
		easeOutBack: function (x, t, b, c, d, s) {
			if (s == undefined) s = 1.70158;
			return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
		},
		easeInBounce: function (x, t, b, c, d) {
			return c - jQuery.easing.easeOutBounce (x, d-t, 0, c, d) + b;
		},
		easeOutBounce: function (x, t, b, c, d) {
			if ((t/=d) < (1/2.75)) {
				return c*(7.5625*t*t) + b;
			} else if (t < (2/2.75)) {
				return c*(7.5625*(t-=(1.5/2.75))*t + .75) + b;
			} else if (t < (2.5/2.75)) {
				return c*(7.5625*(t-=(2.25/2.75))*t + .9375) + b;
			} else {
				return c*(7.5625*(t-=(2.625/2.75))*t + .984375) + b;
			}
		}
	});

})(jQuery)