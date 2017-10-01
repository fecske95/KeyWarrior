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

// A szöveg beúszási sebessége
var textSpeed = 2;

// textloader-ből betöltött szöveg
var currentText = "THIS IS A TEST TEXT";

window.onload = function () {
    mainCanvas.width = cWidth;
    mainCanvas.height = cHeight;
    
    mainCtx.font = "48pt segoe";
    
    startGame();
    
    setInterval(update, 1000/120);
    setInterval(draw, 1000/60);
}

$(document).keydown(function(e) {
    if(keys.length > 0 && e.keyCode == keys[0].getKey()) {
        keys.splice(0, 1);
    }
});

// A játék elindítása
function startGame() {
    for(var i = 0; i < currentText.length; i++) {
        var Key = createKey(currentText[i], cWidth+i*100, cHeight/2 - 50);
    }
}

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

// Key factory
function createKey(character, x, y) {
    var Key = new key(character, x, y);
    Key.visible = true;
    Key.heigth = 100;
    Key.width = 100;
    Key.speedX = -textSpeed;
    keys.push(Key);
    return Key;
}

function deleteKey(key) {
    for(var i = 0; i < keys.length; i++) {
        if(keys[i] === key) {
            keys.splice(i, 1);
        }
    }
}