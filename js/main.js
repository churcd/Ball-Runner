window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame ||
              window.oRequestAnimationFrame ||
              window.msRequestAnimationFrame ||
              function (callback) {
                  window.setTimeout(callback, 1000 / 60);
              };
          })();

function start() {
    var canvas = document.getElementById('display');
    var ctx = canvas.getContext('2d');
    
    var blocks = [
     {
         block: Block,
         x: 2,
         y: 8
     },
     {
         block: Block,
         x: 2,
         y: 13
     },
     {
         block: Block,
         x: 7,
         y: 13
     },
     {
         block: Block,
         x: 23 - 2,
         y: 2
     },
     {
         block: Block,
         x: 23 - 2,
         y: 7
     },
     {
         block: Block,
         x: 23 - 7,
         y: 2
     },
     {
        block: WaterBlock,
        x: 12,
        y: 3
    },
     {
         block: WaterBlock,
         x: 11,
         y: 3
     },
     {
         block: WaterBlock,
         x: 10,
         y: 3
     },
     {
         block: WaterBlock,
         x: 12,
         y: 4
     },
     {
         block: WaterBlock,
         x: 11,
         y: 4
     },
     {
         block: WaterBlock,
         x: 10,
         y: 4
     },
    ];

    var emitters = [
    {
        emitter: RotatingEmitter,
        x: 12,
        y: 8,
        angle: 0
    }
    ];

    var l = new Level({
        blocks: blocks,
        emitters: emitters
    });


    var lt = Date.now();
    var lft = lt;
    var fps = 0;

    var player = new Player(l, { x: 8, y: 8 });
    l.addBall(player);

    var kbd = new KeyboardHandler();

    var f = function () {
        var nt = Date.now();
        fps++;

        if (nt - lft > 1000) {
            console.log('FPS: ' + fps);
            lft = nt;
            fps = 0;
        }

        kbd.controlBall(player);
        l.update((nt - lt) / 1000.0);

        l.render(ctx);

        if (nt - lt > 1000 / 30)
            requestAnimFrame(f);
        else
            setTimeout(function () { requestAnimFrame(f); }, 1000 / 28 - (nt - lt));

        lt = nt;
    };
    requestAnimFrame(f);
}