import ui.ImageScaleView as ImageScaleView;
import ui.ImageView as ImageView;
import ui.TextView as TextView;
import src.lib.platformer.ParallaxView as ParallaxView;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		var parallaxView = new ParallaxView({
			superview: this.view,
			width: this.view.style.width,
			height: this.style.height,
		});
		parallaxView.addBackgroundView(new ImageScaleView({
			scaleMethod: 'cover',
			image: "resources/images/level/backgroundSky.png",
		}));
		var brushLayer = parallaxView.addLayer({
			distance: 20,
			populate: function (layer, x) {
				var v = layer.obtainView(ImageView, {
					superview: layer,
					image: "resources/images/level/fargroundBrush.png",
					x: x,
					y: layer.style.height - 250,
					opacity: 0.5,
					width: 1024,
					height: 212,
				});
				return v.style.width;
			}
		});
	};

	this.launchUI = function () {};
});
