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
    
    setInterval(update, 1000/60);
    setInterval(draw, 1000/60);
    
    var Key = new key('A', 200, 200);
    keys.push(Key);
}

function draw() {
    for(var i = 0; i < keys.length; i++) {
        keys[i].draw();
    }
}

function update() {
    for(var i = 0; i < keys.length; i++) {
        keys[i].update();
    }
}