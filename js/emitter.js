function Emitter(level, x, y, angle) {
    this.level = level;
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.firingVelocity = 4;

    this.shotInterval = 1.7;
    this.shotTime = Math.random() * this.shotInterval;

    this.ballType = Ball;
}

Emitter.prototype.getFiringVelocity = function () {
    return this.firingVelocity;
}

Emitter.prototype.update = function (time) {
    this.shotTime -= time;
    if (this.shotTime < 0) {
        this.fireShot();
        this.shotTime = this.shotInterval;
    }
}

Emitter.prototype.fireShot = function () {
    var b = new this.ballType(this.level, { x: this.x, y: this.y, angle: this.angle, velocity: this.getFiringVelocity() });
    this.level.addBall(b);
}

Emitter.prototype.render = function (ctx) {
    var bright = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
    var c = bright[Math.floor(bright.length * (1.0 - this.shotTime / this.shotInterval))];
    ctx.fillStyle = '#F' + c + c;
    ctx.strokeStyle = '#C44';

    ctx.translate(this.x * this.level.tileW, this.y * this.level.tileH);
    ctx.rotate(this.angle - Math.PI);

    ctx.beginPath();
    ctx.moveTo(this.level.tileH * 0.25, this.level.tileW * -0.2);
    ctx.lineTo(this.level.tileH * 0.25, this.level.tileW * 0.2);
    ctx.lineTo(-this.level.tileH * 0.35, this.level.tileW * 0.4);
    ctx.lineTo(-this.level.tileH * 0.35, this.level.tileW * -0.4);
    ctx.lineTo(this.level.tileH * 0.25, this.level.tileW * -0.2);
    ctx.fill();
    ctx.stroke();
    ctx.closePath();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
}

function RotatingEmitter(level, x, y, angle) {
    RotatingEmitter.prototype.constructor.call(this, level, x, y, angle);
}

RotatingEmitter.prototype = new Emitter();

RotatingEmitter.prototype.update = function (time) {
    this.angle += Math.PI * time;
    Emitter.prototype.update.call(this, time);
}