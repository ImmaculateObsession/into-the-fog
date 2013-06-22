import ui.View as View;
import ui.ImageView as ImageView;
import src.lib.platformer.ParallaxView as ParallaxView;

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
        var parallaxView = new ParallaxView({
            superview: this,
            width: this.style.width,
            height: this.style.height
        });
        parallaxView.addBackgroundView(new View({
            color: '#000000'
        }));
        var leftTreeLayer = parallaxView.addLayer({
            distance: 20,
            scrollVertical: true,
            populate: function (layer, y, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: "resources/images/level/midgroundTree3.png",
                    x: 0,
                    y: y,
                    opacity: 1,
                    width: 100,
                    height: 100
                });
                return v.style.width;
            }
        });

        var rightTreeLayer = parallaxView.addLayer({
            distance: 20,
            scrollVertical: true,
            populate: function (layer, y, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: "resources/images/level/midgroundTree3.png",
                    x: this._superview._superview.style.width-100,
                    y: y,
                    opacity: 1,
                    width: 100,
                    height: 100
                });
                return v.style.width;
            }
        });

        var switchClick = new View({
            superview:this,
            width: this.style.width,
            height: this.style.height
        });

        switchClick.on('InputSelect', bind(this, function () {
            this.emit('shadowworld:switch');
        }));

        parallaxView.scrollTo(0,0);
        var y = 0;
        GC.app.engine.on('Tick', function (dt) {
            y += 20;
            parallaxView.scrollTo(0, y);
        });
    };
});