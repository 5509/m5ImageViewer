/**
 * m5ImageViewer
 *
 * @version      1.1
 * @author       nori (norimania@gmail.com)
 * @copyright    5509 (http://5509.me/)
 * @license      The MIT License
 * @link         http://5509.me/log/m5imageviewer
 *
 * 2010-02-09 03:05
 */
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
	 * exShowHide
	 */
	$.fn.exShow = function(duration) {
		if (!$.support.opacity) {
			$(this).show();
		} else {
			$(this).fadeIn(duration);
		}
		return this;
	}
	$.fn.exHide = function(duration) {
		if (!$.support.opacity) {
			$(this).hide();
		} else {
			$(this).fadeOut(duration);
		}
		return this;
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
			closeBtn = $("<div id='m5ImgViewerClose' style='display: none'></div>"),
			clickBlocker = $("<div id='m5ImgViewerBlocker' style='display: none'></div>"),
			loading = $([
					"<div id='m5ImgViewerLoading' style='display: none'>",
						"<div id='m5ImgViewerLoadingIcon'></div>",
					"</div>"
				].join(""));
			
		body.append(
			clickBlocker,
			loading,
			closeBtn
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
				
				clickBlocker
					.css({
						display: "block",
						width: document.body.clientWidth || document.documentElement.clientWidth,
						height: document.body.clientHeight || document.documentElement.clientHeight,
						position: "fixed",
						top: 0,
						left: 0
					});
					
				$("#m5ImgViewerClose, #m5ImgViewerBlocker")
					.one("click", function() {
						
						$("#m5ImgViewerClose, #m5ImgViewerBlocker").unbind("click");
						
						clickBlocker.css("display", "none");
						closeBtn.exHide("fast");
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
							})
					})
				
				loading
					.css({
						display: "block",
						width: _size.width,
						height: _size.height,
						position: "absolute",
						top: _pos.top,
						left: _pos.left
					});
				
				$("<img src='" + _this.attr("href") + "'/>").m5ImgLoad(function() {
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
											.exShow("fast");
									}
								})
						);
				});
				
				return false;
			});
			
		});
	}
})(jQuery);