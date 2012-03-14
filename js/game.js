function Level(data) {
    this.tileW = 32;
    this.tileH = 32;
    this.tilesX = 24;
    this.tilesY = 16;

    this.width = this.tileW * this.tilesX;
    this.height = this.tileH * this.tilesY;

    this.blocks = [];
    this.emitters = [];
    this.balls = [];

    for (var i = 0; i < data.blocks.length; i++) {
        var b = data.blocks[i];
        this.addBlock(new b.block(this, b.x, b.y));
    }

    for (var i = 0; i < data.emitters.length; i++) {
        var e = data.emitters[i];
        this.addEmitter(new e.emitter(this, e.x, e.y, e.angle));
    }

    this.fillEdgeWalls(Block);
}

Level.prototype.addBall = function (ball) {
    this.balls.push(ball);
}

Level.prototype.removeBall = function (ball) {
    var i = this.balls.indexOf(ball);
    this.balls.splice(i, 1);
}

Level.prototype.addBlock = function (block) {
    this.blocks.push(block);
}

Level.prototype.addEmitter = function (emitter) {
    this.emitters.push(emitter);
}

Level.prototype.fillEdgeWalls = function(blockType)
{
    for (var x = 0; x < this.tilesX; x++) {
        this.addBlock(new blockType(this, x, 0));
        this.addBlock(new blockType(this, x, this.tilesY - 1));
    }

    for (var y = 0; y < this.tilesY; y++) {
        this.addBlock(new blockType(this, 0, y));
        this.addBlock(new blockType(this, this.tilesX - 1, y));
    }
}

Level.prototype.update = function (time) {
    for (var i = 0; i < this.emitters.length; i++) {
        this.emitters[i].update(time);
    }

    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].update(time);
    }
}

Level.prototype.render = function (ctx) {

    ctx.fillStyle = '#CCC';
    ctx.fillRect(0, 0, this.width, this.height);

    for (var i = 0; i < this.blocks.length; i++) {
        this.blocks[i].render(ctx);
    }

    for (var i = 0; i < this.balls.length; i++) {
        this.balls[i].render(ctx);
    }

    for (var i = 0; i < this.emitters.length; i++) {
        this.emitters[i].render(ctx);
    }
}

Level.prototype.collide = function (x1, y1, x2, y2, radius) {
    for (var i = 0; i < this.blocks.length; i++) {
        var ang = this.blocks[i].collide(x1, y1, x2, y2, radius);
        if (ang != null)
            return ang;
    }

    return null;
}
