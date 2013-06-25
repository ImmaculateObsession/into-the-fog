import ui.ImageView as ImageView;
import ui.StackView as StackView;
import ui.TextView as TextView;
import ui.ImageScaleView as ImageScaleView;
import src.lib.platformer.ParallaxView as ParallaxView;
import src.RealWorldView as RealWorldView;
import src.ShadowWorldView as ShadowWorldView;
import src.RealToShadowView as RealToShadowView;
import src.ShadowToRealView as ShadowToRealView;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		var realworld = new RealWorldView({
			width: this.view.style.width,
			height: this.view.style.height
		});

		var shadowworld = new ShadowWorldView({
			width: this.view.style.width,
			height: this.view.style.height
		});

		var realToShadow = new RealToShadowView({
			width: this.view.style.width,
			height: this.view.style.height
		});

		var shadowToReal = new ShadowToRealView({
			width: this.view.style.width,
			height: this.view.style.height
		});

		var rootView = new StackView({
			superview: this,
			width: this.view.style.width,
			height: this.view.style.height
		});

		rootView.push(realworld);

		realworld.on('realworld:switch', function () {
			console.log(rootView.getStack());
			rootView.push(realToShadow);
		});

		realToShadow.on('realtoshadow:switch', function () {
			console.log(rootView.getStack());
			rootView.push(shadowworld);
			rootView.remove(realToShadow);		
		});

		shadowworld.on('shadowworld:switch', function () {
			console.log(rootView.getStack());
			rootView.push(shadowToReal);
			rootView.remove(shadowworld);
		});

		shadowToReal.on('shadowtoreal:switch', function () {
			console.log(rootView.getStack());
			rootView.pop();
		});
	};

	this.launchUI = function () {};
});
