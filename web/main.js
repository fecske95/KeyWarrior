// Skálázáshoz
var cWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

var cHeight = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

// Billentyű canvas
var mainCanvas = document.getElementById("MainCanvas");
var mainCtx = mainCanvas.getContext("2d");

// A létező billentyűket tartalmaző tömb
var keys = [];

// textloader-ből betöltött szöveg
var currentText = "this is a test text";

window.onload = function () {
    mainCanvas.width = cWidth;
    mainCanvas.height = cHeight;
    
    mainCtx.font = "48pt segoe";
    
    setInterval(update, 1000/120);
    setInterval(draw, 1000/60);
    
    var Key = new key('A', 200, 200);
    Key.visible = true;
    Key.heigth = 100;
    Key.width = 100;
    //Key.speedX = 1;
    //Key.speedY = 1;
    keys.push(Key);
}

$(document).keydown(function(e) {
    for(var i = 0; i < keys.length; i++) {
        // Ha megnyomják a 'key' megfelelő karakteréhez tartozó billentyűt, töröljük
        if(e.keyCode === keys[i].getKey()) {
            keys.splice(i, 1);
        }
    }
});

function draw() {
    // Képernyő törlése
    mainCtx.clearRect(0,0,mainCanvas.width,mainCanvas.height);
    
    // Létező billentyűk kirajzolása
    for(var i = 0; i < keys.length; i++) {
        keys[i].draw();
    }
}

function update() {
    // Létező billentyűk logikájának futtatása
    for(var i = 0; i < keys.length; i++) {
        keys[i].update();
    }
}