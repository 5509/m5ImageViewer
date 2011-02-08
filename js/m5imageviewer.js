/**
 * m5ImageViewer
 *
 * @version      0.1
 * @author       nori (norimania@gmail.com)
 * @copyright    5509 (http://5509.me/)
 * @license      The MIT License
 * @link         http://5509.me/log/m5imageviewer
 *
 * 2010-01-27 23:50
 */

if ( !window.console ) {
	window.console = {
		log: function() {},
		debug: function() {}
	}
}
 
;(function($) {
	/**
	 * m5ImgLoad
	 *
	 * @author       nori (norimania@gmail.com)
	 * @copyright    5509 (http://5509.me/)
	 * @license      The MIT License
	 * @link         https://github.com/5509/m5ImgLoad
	 *
	 */
 	$.fn.m5ImgLoad = function(callback, interval) {
		var _this = this,
			_img = $(this).get(0),
			newImg = new Image();
			
		newImg.src = _img.src;
		
		(function() {
			if ( newImg.complete ) {
				callback.call($(newImg));
				return;
			}
			setTimeout(arguments.callee, interval || 20);
		})();
	}

	$.fn.m5ImageViewer = function(options) {
		var body = $("body"),
			windowResized = false,
			c = $.extend({
					clientFit: true,
					padding: 20,
					side: "auto" // you can select either "right" or "left"
				}, options),
			returnClientSize = function() {
					return {
						x: document.body.clientWidth || document.documentElement.clientWidth,
						y: document.body.clientHeight || document.documentElement.clientHeight
					}
				},
			returnScrollTop = function() {
					return {
						y: document.body.scrollTop || document.documentElement.scrollTop,
						x: document.body.scrollLeft || document.documentElement.scrollLeft
					}
				},
			clientSize = returnClientSize(),
			loading = $([
					"<div id='m5ImageViewerLoading' style='display: none'>",
						"<div id='m5ImageViewerLoadingIcon'></div>",
					"</div>"
				].join(""));
			
		$(window).resize(function() {
			// ブラウザがリサイズされたらサイズを更新しておく
			clientSize = returnClientSize();
			// windowがリサイズされたらtrueにしておく
			windowResized = true;
		});
		
		// loadingを追加してローディングアイコンを読み込んでおく
		body.append(loading);
			
		return $(this).each(function() {
			var _this = $(this),
				_img = _this.find("img"),
				_pos = _img.offset(),
				_size = {
					width: _img.attr("offsetWidth"),
					height: _img.attr("offsetHeight"),
					top: _pos.top,
					left: _pos.left
				},
				_animationTo = {},
				_loadedSize = {};
				
			_this.click(function() {
			
				if ( c.clientFit ) {
					
				}
			
				if ( windowResized ) {
					_pos = _img.offset();
					
					_size.top = _pos.top;
					_size.left = _pos.left;
				}
							
				// ローディングの表示
				loading
					.css({
						display: "block",
						width: _size.width,
						height: _size.height,
						position: "absolute",
						top: _pos.top,
						left: _pos.left
					});
				
				$("img.m5ImgViewerPrev")
					.animate({
						width: _size.width,
						height: _size.height,
						opacity: 0
					}, {
						duration: 400,
						easing: "swing",
						complete: function() {
							$(this).remove();
						}
					});
				
				$("<img src='" + _this.attr("href") + "'/>").m5ImgLoad(function() {
				
					// ローディングの非表示
					loading.css("display", "none");
				
					var __this = $(this);
					_loadedSize = {
						width: __this.attr("width"),
						height: __this.attr("height")
					}
					
					//console.debug(_loadedSize);
					// _loadedSizeが取れないのでここから下にすすめない
					
					body
						.append(
							__this
								.addClass("m5ImgViewerPrev")
								.css({
									width: _size.width,
									height: _size.height,
									position: "absolute",
									top: _size.top,
									left: _size.left,
									opacity: 0
								})
								.animate({
									width: _loadedSize.width,
									height: _loadedSize.height,
									opacity: 1
								}, {
									duration: 400,
									easing: "swing"
								})
						)
						.click(function() {
							__this
								.animate({
									width: _size.width,
									height: _size.height,
									opacity: 0
								}, {
									duration: 400,
									easing: "swing",
									complete: function() {
										__this.remove();
									}
								})
						})
				});
				
				return false;
			});
			
		});
	}
})(jQuery);
