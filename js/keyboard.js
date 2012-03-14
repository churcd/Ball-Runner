function KeyboardHandler() {
    var me = this;

    this.keys = {};
    document.body.onkeydown = function (evt) { me.keyDown(evt) };
    document.body.onkeyup = function (evt) { me.keyUp(evt) };
}

KeyboardHandler.prototype.keyDown = function (evt) {
    this.keys[evt.which] = true;
}

KeyboardHandler.prototype.keyUp = function (evt) {
    this.keys[evt.which] = false;
}

KeyboardHandler.prototype.controlBall = function (b) {
    b.velocity = b.maxVelocity;

    if (this.keys[37]) // Left
    {
        b.angle = Math.PI;
        if (this.keys[38])
            b.angle += Math.PI / 4;
        else if (this.keys[40])
            b.angle -= Math.PI / 4;
    }
    else if (this.keys[39]) // Right
    {
        b.angle = 0;
        if (this.keys[38])
            b.angle -= Math.PI / 4;
        else if (this.keys[40])
            b.angle += Math.PI / 4;
    }
    else if (this.keys[38]) // Up
        b.angle = -Math.PI / 2;
    else if (this.keys[40]) // Down
        b.angle = Math.PI / 2;
    else
        b.velocity = 0;
}