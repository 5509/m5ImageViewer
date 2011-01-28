/**
 * exValidation
 *
 * @version      0.1
 * @author       nori (norimania@gmail.com)
 * @copyright    5509 (http://5509.me/)
 * @license      The MIT License
 * @link         http://5509.me/log/m5imageviewer
 *
 * 2010-01-27 23:50
 */
 
 ;(function($) {
 	$.fn.m5ImageViewer = function(options) {
		var body = $("body");
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
				_loadedSize = {};
				
			_this.click(function() {
				$("<img src='" + _this.attr("href") + "'/>").load(function() {
					var __this = $(this);
					_loadedSize = {
						width: __this.width(),
						height: __this.height()
					}
					
					console.debug(_loadedSize);
					// Ç±ÇÍÇ≈éÊÇÍÇ»Ç¢Ç©ÇÁâ∫Ç…êiÇﬂÇ»Ç¢
					
					body.append(
						__this
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
				});
				
				return false;
			});
			
		});
	}
 })(jQuery);
