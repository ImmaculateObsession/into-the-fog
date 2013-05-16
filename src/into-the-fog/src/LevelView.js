import ui.View;
import ui.ImageView as ImageView;
import ui.ImageScaleView as ImageScaleView;
import src.lib.platformer.ParallaxView as ParallaxView;


exports = Class(ui.View, function (supr) {
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
        parallaxView.addBackgroundView(new ImageScaleView({
            scaleMethod: 'cover',
            image: "resources/images/level/backgroundSky.png"
        }));
        var brushLayer = parallaxView.addLayer({
            distance: 20,
            populate: function (layer, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: "resources/images/city_building1.png",
                    x: x,
                    y: 0,
                    opacity: 1,
                    width: 256,
                    height: 160
                });
                return v.style.width;
            }
        });

        var switchClick = new ui.View({
            superview:this,
            width: this.style.width,
            height: this.style.height
        });

        switchClick.on('InputSelect', bind(this, function () {
            this.emit('levelview:switch');
        }));

        parallaxView.scrollTo(0,0);
        var x = 0;
        GC.app.engine.on('Tick', function (dt) {
            x += 2;
            brushLayer.scrollTo(x, 0);
        });
    };
});