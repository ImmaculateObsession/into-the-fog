import ui.ImageView as ImageView;
import ui.StackView as StackView;
import ui.TextView as TextView;
import src.lib.platformer.ParallaxView as ParallaxView;
import src.LevelView as LevelView;

exports = Class(GC.Application, function () {

	this.initUI = function () {
		var levelscreen = new LevelView({
			width: this.view.style.width,
			height: this.view.style.height
		});

		var rootView = new StackView({
			superview: this,
			width: this.view.style.width,
			height: this.view.style.height
		});
		rootView.push(levelscreen);
	};

	this.launchUI = function () {};
});
