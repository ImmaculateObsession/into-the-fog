import ui.ImageView as ImageView;
import ui.StackView as StackView;
import ui.TextView as TextView;
import ui.ImageScaleView as ImageScaleView;
import src.lib.platformer.ParallaxView as ParallaxView;
import src.RealWorldView as RealWorldView;
import src.ShadowWorldView as ShadowWorldView;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		var realworld = new RealWorldView({
			width: this.view.style.width,
			height: this.view.style.height
		});

		var shadowworld = new ShadowWorldView({
			width: this.view.style.width,
			height: this.view.style.height
		})

		var rootView = new StackView({
			superview: this,
			width: this.view.style.width,
			height: this.view.style.height
		});
		rootView.push(realworld);

		realworld.on('realworld:switch', function () {
			rootView.push(shadowworld);
		});

		shadowworld.on('shadowworld:switch', function () {
			rootView.push(realworld);
		})
	};

	this.launchUI = function () {};
});
