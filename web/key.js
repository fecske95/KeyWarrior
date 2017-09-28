var keyGfx = new Image();
keyGfx.src = "images/key.jpg";

function Key (char, x, y) {
    this.character = char;
    this.image = new Image();
    
    this.x = x;
    this.y = y;
}

Key.prototype.draw = function() {
    mainCtx.drawImage(keyGfx, this.x, this.y);
}

Key.prototype.update = function() {
    
}
