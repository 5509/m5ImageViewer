/**
 * m5ImageViewer
 *
 * @version      1.0
 * @author       nori (norimania@gmail.com)
 * @copyright    5509 (http://5509.me/)
 * @license      The MIT License
 * @link         http://5509.me/log/m5imageviewer
 *
 * 2010-02-09 03:05
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

	/**
	 * m5ImgLoad
	 */
	$.fn.m5ImageViewer = function(options) {
		var body = $("body"),
			windowResized = false,
			c = $.extend({
					duration: 200
				}, options),
			closeBtn = $("<div id='m5ImgViewerClose'></div>"),
			loading = $([
					"<div id='m5ImgViewerLoading' style='display: none'>",
						"<div id='m5ImgViewerLoadingIcon'></div>",
					"</div>"
				].join(""));
			
		// loadingを追加してローディングアイコンを読み込んでおく
		body.append(
			loading,
			closeBtn.hide()
		);
			
		return $(this).each(function() {
			var _this = $(this),
				_img = _this.find("img"),
				_pos = _img.offset(),
				_size = {
					width: _img.attr("offsetWidth"),
					height: _img.attr("offsetHeight"),
					top: _pos.top,
					left: _pos.left
				};
				
			_this.click(function() {
				_pos = _img.offset();
				_size = {
					width: _img.attr("offsetWidth"),
					height: _img.attr("offsetHeight"),
					top: _pos.top,
					left: _pos.left
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
				
				closeBtn.fadeOut("fast");
				$("img.m5ImgViewerPrev")
					.animate({
						width: _size.width,
						height: _size.height,
						opacity: 0
					}, {
						duration: c.duration,
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
									duration: c.duration,
									easing: "swing",
									complete: function() {
										$("#m5ImgViewerClose")
											.css({
												top: _size.top,
												left: _size.left
											})
											.fadeIn("fast");
									}
								})
						)
						.click(function() {
							closeBtn.fadeOut("fast");
							__this
								.animate({
									width: _size.width,
									height: _size.height,
									opacity: 0
								}, {
									duration: c.duration,
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
