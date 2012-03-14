function Player(level, props) {
    props.life = 3600.0;
    props.velocity = 0.0;
    props.radius = 0.3;
    Ball.prototype.constructor.call(this, level, props);

    this.maxVelocity = 6;
}

Player.prototype = new Ball();
Player.prototype.constructor = Player;


Player.prototype.render = function (ctx) {
    ctx.fillStyle = "#FF0";
    ctx.strokeStyle = "#000";

    ctx.beginPath();
    ctx.arc(this.x * this.level.tileW, this.y * this.level.tileH, this.level.tileW * this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x * this.level.tileW + this.radius * 0.3 * this.level.tileW,
            this.y * this.level.tileH - this.radius * 0.2 * this.level.tileW,
            this.level.tileW * this.radius * 0.1,
            0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x * this.level.tileW - this.radius * 0.3 * this.level.tileW,
            this.y * this.level.tileH - this.radius * 0.2 * this.level.tileW,
            this.level.tileW * this.radius * 0.1,
            0, Math.PI * 2);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(this.x * this.level.tileW,
            this.y * this.level.tileH + this.radius * 0.2 * this.level.tileW,
            this.level.tileW * this.radius * 0.3,
            0, Math.PI);
    ctx.stroke();
}