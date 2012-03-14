function Ball(level, props) {
    if (!level)
        return;

    this.level = level;
    this.x = props.x || 0;
    this.y = props.y || 0;
    this.angle = props.angle || 0;
    this.velocity = props.velocity   || 0;
    this.life = props.life || 10;
    this.radius = props.radius || 0.2;
    this.fillColor = props.fillColor || "#FAF";
    this.strokeColor = props.strokeColor || "#C4C";
}

Ball.prototype.update = function (time, alreadyHit) {
    var dx = Math.cos(this.angle) * this.velocity * time;
    var dy = Math.sin(this.angle) * this.velocity * time;

    var ang = this.level.collide(this.x, this.y, this.x + dx, this.y + dy, this.radius);
    if (ang != null) {

        if (!alreadyHit) {
            this.angle = ang;
            this.update(time, true);

            return;
        }
    }

    this.x += dx;
    this.y += dy;

    this.life -= time;
    if (this.life <= 0)
        this.level.removeBall(this);
};

Ball.prototype.render = function (ctx) {
    ctx.fillStyle = this.fillColor;
    ctx.strokeStyle = this.strokeColor;

    if (this.life < 0.5)
        ctx.globalAlpha = this.life * 2.0;

    ctx.beginPath();
    ctx.arc(this.x * this.level.tileW, this.y * this.level.tileH, this.level.tileW * this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.globalAlpha = 1.0;
};