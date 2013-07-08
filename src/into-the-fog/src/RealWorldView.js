import ui.View;
import ui.ImageView as ImageView;
import ui.ImageScaleView as ImageScaleView;
import ui.SpriteView as SpriteView;
import src.lib.platformer.ParallaxView as ParallaxView;
import src.lib.platformer.util as util


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
        this.parallaxView = new ParallaxView({
            superview: this,
            width: this.style.width,
            height: this.style.height
        });

        this.parallaxView.addBackgroundView(new ImageScaleView({
            scaleMethod: 'cover',
            image: "resources/images/level/backgroundSky.png"
        }));

        // order matters here. roadlayer THEN buildinglayer
        var roadLayer = this.parallaxView.addLayer({
            distance:20,
            populate: function (layer, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: "resources/images/city_road.png",
                    x: x,
                    y: 0,
                    opacity: 1,
                    width: 256,
                    height: 320
                });
                return v.style.width;
            }
        });

        var buildingLayer = this.parallaxView.addLayer({
            distance: 20,
            populate: function (layer, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: "resources/images/city_building" + util.choice([1, 2]) + ".png",
                    x: x-2,
                    y: 0,
                    opacity: 1,
                    width: 256,
                    height: 161
                });
                return v.style.width;
            }
        });

        var treeLayer = this.parallaxView.addLayer({
            distance: 20,
            populate: function (layer, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: "resources/images/city_obstacle4.png",
                    x: x,
                    y: 50,
                    opacity: 1,
                    width: 74,
                    height: 131
                });
                return 250;
            }
        });

        var trashcanLayer = this.parallaxView.addLayer({
            distance: 20,
            populate: function (layer, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: "resources/images/city_obstacle1.png",
                    x: x,
                    y: 142,
                    opacity: 1,
                    width: 30,
                    height: 47
                });
                return 500;
            }
        });

        var hydrantLayer = this.parallaxView.addLayer({
            distance: 20,
            populate: function (layer, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: "resources/images/city_obstacle2.png",
                    x: x,
                    y: 152,
                    opacity: 1,
                    width: 21,
                    height: 38
                });
                return 752;
            }
        });

        var meterLayer = this.parallaxView.addLayer({
            distance: 20,
            populate: function (layer, x) {
                var v = layer.obtainView(ImageView, {
                    superview: layer,
                    image: "resources/images/city_obstacle3.png",
                    x: x,
                    y: 132,
                    opacity: 1,
                    width: 14,
                    height: 58
                });
                return 100;
            }
        });

        // var quail = new SpriteView({
        //     superview: this,
        //     sheetData: {
        //         url: "resources/images/characters/quail.png",
        //         anims: {
        //             up:     [ [0,0], [1,0], [2,0], [3,0], [4,0], [5,0], [6,0], [7,0] ],
        //             down:   [ [0,1], [1,1], [2,1], [3,1], [4,1], [5,1], [6,1], [7,1] ],
        //             left:   [ [0,2], [1,2], [2,2], [3,2], [4,2], [5,2], [6,2], [7,2] ],
        //             right:  [ [0,3], [1,3], [2,3], [3,3], [4,3], [5,3], [6,3], [7,3] ]
        //         }
        //     },
        //     width: 64,
        //     height: 64,
        //     x: this.style.width/4,
        //     y: 180,
        //     framerate: 2
        // });

        // quail.startAnimation('right', {loop:true});

        // var dragView = new ui.View({
        //     superview: this,
        //     width: this.style.width,
        //     height: this.style.height
        // });

        // dragView.on('InputSelect', bind(quail, function(evt) {
        //     quail.startDrag({
        //         inputStartEvt: evt,
        //         radius: 10
        //     });
        // }));

        // quail.on('DragStart', function (dragEvt) {
        //     quail.dragOffset = {
        //         x: dragEvt.srcPt.x - quail.style.x,
        //         y: dragEvt.srcPt.y - quail.style.y
        //     };
        // });

        // // Let the player drag the character up and down.
        // quail.on('Drag', function (startEvt, dragEvt, delta) {
        //     quail.style.y = dragEvt.srcPt.y - quail.dragOffset.y;
        // });

        // quail.on('DragStop', function (startEvt, dragEvt) {
        //     quail.style.y = dragEvt.srcPt.y - quail.dragOffset.y;
        // });

        var biker = new SpriteView({
            superview: this,
            x: this.style.width/4,
            y: 160,
            width: 100,
            height: 100,
            url: 'resources/images/characters/bike',
            framerate: 15
        });

        biker.startAnimation('side', {loop: true});

        var switchClick = new ui.View({
            superview:this,
            x: this.style.width - 60,
            y: this.style.height - 60,
            width: 50,
            height: 50,
            backgroundColor: "#0ef000"
        });

        switchClick.on('InputSelect', bind(this, function () {
            this.emit('realworld:switch');
        }));
        var para = this.parallaxView
        para.scrollTo(0,0);
        var x = 0;
        GC.app.engine.on('Tick', function (dt) {
            x += 100;
            para.scrollTo(x, 0);
        });
    };
});