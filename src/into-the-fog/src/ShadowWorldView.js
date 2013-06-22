import ui.View as View;
import ui.ImageView as ImageView;
import ui.SpriteView as SpriteView;
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

        var roadLayer = parallaxView.addLayer({
            distance:20,
            scrollVertical: true,
            populate: function (layer, y, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: 'resources/images/shadow_road.png',
                    x: 0,
                    y: y,
                    opacity: 1,
                    width: 512,
                    height: 320
                });
                return v.style.height - 4;
            }
        });

        var rightBuildingLayer = parallaxView.addLayer({
            distance: 20,
            scrollVertical: true,
            populate: function (layer, y, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: "resources/images/shadow_building1_right.png",
                    x: -10,
                    y: y,
                    opacity: 1,
                    width: 120,
                    height: 250
                });
                return v.style.height - 50;
            }
        });

        var leftBuildingLayer = parallaxView.addLayer({
            distance: 20,
            scrollVertical: true,
            populate: function (layer, y, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: "resources/images/shadow_building1_left.png",
                    x: this._superview._superview.style.width-110,
                    y: y,
                    opacity: 1,
                    width: 120,
                    height: 250
                });
                return v.style.height - 50;
            }
        });

        var quail = new SpriteView({
            superview: this,
            sheetData: {
                url: "resources/images/characters/quail.png",
                anims: {
                    up:     [ [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0] ],
                    down:   [ [0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1] ],
                    left:   [ [0,2], [1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2] ],
                    right:  [ [0,3], [1,3], [2,3], [3,3], [4,3], [5,3], [6,3], [7,3] ]
                }
            },
            width: 64,
            height: 64,
            x: this.style.width/2 - 32,
            y: this.style.height/2 - 32,
            framerate: 2
        });

        quail.startAnimation('down', {loop:true});

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