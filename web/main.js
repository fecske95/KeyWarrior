//resolution stuff
var cWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

var cHeight = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

var mainCanvas = document.getElementById("MainCanvas");
var mainCtx = mainCanvas.getContext("2d");

var keys = [];

window.onload = function () {
    mainCanvas.width = cWidth;
    mainCanvas.height = cHeight;
    
    setInterval(update, 1000/120);
    setInterval(draw, 1000/60);
    
    var Key = new key('A', 200, 200);
    Key.heigth = 100;
    Key.width = 100;
    //Key.speedX = 1;
    //Key.speedY = 1;
    keys.push(Key);
}

function draw() {
    mainCtx.clearRect(0,0,mainCanvas.width,mainCanvas.height);
    for(var i = 0; i < keys.length; i++) {
        keys[i].draw();
    }
}

function update() {
    for(var i = 0; i < keys.length; i++) {
        keys[i].update();
    }
}