var keyGfx = new Image();
keyGfx.src = "images/key.png";

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
        this.visible = false;
    }

    draw() {
       // mainCtx.clearRect(this.x,this.y,this.width,this.heigth);
        if(this.visible)
        {
            mainCtx.drawImage(keyGfx,0,0,keyGfx.width,keyGfx.height, this.x, this.y,this.width,this.heigth);
            mainCtx.fillText(this.character, this.x+this.width/2 - 24, this.y+this.heigth/2 + 24); 
        }
    }

    update() 
    {
        this.x = this.x + this.speedX;
        this.y = this.y + this.speedY;
    }
}


