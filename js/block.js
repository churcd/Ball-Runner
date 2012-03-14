function Block(level, x, y) {
    this.x = x;
    this.y = y;
    this.level = level;
}

Block.prototype.render = function (ctx) {
    var px = this.level.tileW * this.x;
    var py = this.level.tileH * this.y;

    ctx.fillStyle = '#AAA';
    ctx.strokeStyle = '#666';

    ctx.fillRect(px, py, this.level.tileW, this.level.tileH);
    ctx.strokeRect(px, py, this.level.tileW, this.level.tileH);
}

Block.prototype.collide = function (x1, y1, x2, y2, r) {
    var lx = this.x;
    var ly = this.y;
    var hx = lx + 1.0;
    var hy = ly + 1.0;

    if (x2 + r > lx &&
        y2 + r > ly &&
        x2 - r < hx &&
        y2 - r < hy) {

        var nx = x2 - x1;
        var ny = y2 - y1;

        if (x1 < lx || x1 > hx) {
            if (x1 < lx)
                nx = -Math.abs(nx);
            else if (x1 > hx)
                nx = Math.abs(nx);
        }
        else if (y1 < ly || y1 > hy) {
            if (y1 < ly)
                ny = -Math.abs(ny);
            else if (y1 > hy)
                ny = Math.abs(ny);
        }

        return Math.atan2(ny, nx);
    }

    return null;
};

Block.prototype.update = function (time) {
}

function WaterBlock(level, x, y) {
    WaterBlock.prototype.constructor.call(this, level, x, y);
}

WaterBlock.prototype = new Block();

WaterBlock.prototype.update = function (time) {
    
}

WaterBlock.prototype.render = function (ctx) {
    var px = this.level.tileW * this.x;
    var py = this.level.tileH * this.y;

    ctx.fillStyle = '#3CF';
    ctx.strokeStyle = '#06F';

    ctx.fillRect(px, py, this.level.tileW, this.level.tileH);
    //ctx.strokeRect(px, py, this.level.tileW, this.level.tileH);
}

WaterBlock.prototype.collide = function () {
    return null;
}