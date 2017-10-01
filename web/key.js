var keyGfx = new Image();
keyGfx.src = "images/key.jpg";

class key {
    
    constructor(char, x, y) {
        this.character = char;
        this.image = new Image();

        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.width = keyGfx.width;
        this.heigth = keyGfx.height;
    }

    draw() {
        mainCtx.drawImage(keyGfx, this.x, this.y);
        mainCtx.fillText(this.character, this.x+this.width/2, this.y+this.heigth);    
    }

    update() 
    {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
    
    }
}


