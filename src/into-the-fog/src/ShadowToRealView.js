import ui.View as View;
import ui.SpriteView as SpriteView;
import ui.ImageScaleView as ImageScaleView;

exports = Class(View, function (supr) {
    this.init = function (opts) {
        opts = merge(opts, {
            x:0,
            y:0
        });

        supr(this, 'init', [opts]);

        this.build();
    };

    this.build = function() {
        var transition = new ImageScaleView({
            superview: this,
            scaleMethod: 'cover',
            image: 'resources/images/level/midgroundTree1.png'
        });

        var transistionClickView = new View({
            superview: this,
            width: this.style.width,
            height: this.style.height
        });

        // var quailSpin = new SpriteView({
        //     superView: this,
        // })

        transistionClickView.on('InputSelect', bind(this, function() {
            this.emit('shadowtoreal:switch');
        }));
    };
});