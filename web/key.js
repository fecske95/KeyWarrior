var keyGfx = new Image();
keyGfx.src = "images/key.jpg";

class key {
    
    constructor(char, x, y) {
        this.character = char;
        this.image = new Image();

        this.x = x;
        this.y = y;
    }

    draw() {
        mainCtx.drawImage(keyGfx, this.x, this.y);
    }

    update() {

    }   
}


