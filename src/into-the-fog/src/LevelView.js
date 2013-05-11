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

        parallaxView.scrollTo(0,0);
        var x = 0;
        GC.app.engine.on('Tick', function (dt) {
            x += 2;
            brushLayer.scrollTo(x, 0);
        });
    };
});