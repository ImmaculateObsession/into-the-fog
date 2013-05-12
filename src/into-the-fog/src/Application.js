import ui.ImageView as ImageView;
import ui.StackView as StackView;
import ui.TextView as TextView;
import ui.ImageScaleView as ImageScaleView;
import src.lib.platformer.ParallaxView as ParallaxView;
import src.LevelView as LevelView;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		var levelview = new LevelView({
			width: this.view.style.width,
			height: this.view.style.height
		});

		var altView = new ImageScaleView({
			scaleMethod: 'cover',
			image: "resources/images/level/midgroundTree1.png"
		});

		altView.on('InputSelect', bind(this, function () {
			rootView.push(levelview);
		}));

		var rootView = new StackView({
			superview: this,
			width: this.view.style.width,
			height: this.view.style.height
		});
		rootView.push(levelview);

		levelview.on('levelview:switch', function () {
			rootView.push(altView);
		});
	};

	this.launchUI = function () {};
});
