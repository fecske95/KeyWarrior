// Namespace definíció, minden js fájl tetejére kell
window.KeyWarrior = window.KeyWarrior || {};

// A létező billentyűket tartalmaző tömb
var keysOnScreen = [];

// textloader-ből betöltött szöveg
var currentText = "THIS IS A TEST TEXT";

//Helyes/helytelen találatok
var correctHits = 0;
var wrongHits = 0;

window.onload = function () {
    startGame();
};

$(document).keydown(function (e) {
    if (keysOnScreen.length > 0) {
        if (e.keyCode === keysOnScreen[0].getKey()) {
            removeKey(keysOnScreen[0]);
            correctHits++;
        }
        else {
            wrongHits++;
        }
        updateStats();
    }
});

// A játék elindítása
function startGame() {
    correctHits = 0;
    wrongHits = 0;

    for (var i = 0; i < currentText.length; i++) {
        var key = generateKey(currentText[i]);

        // Pozícionálás
        key.element.style.top = -i * 100 + 'px';

        // CSS Animáció beállítása
        var animationTime = 4 + (i + 1);
        key.element.style["animation-duration"] = animationTime + 's';
        key.element.style["animation-iteration-count"] = 1;

        scheduleForRemove(key, animationTime * 1000);
    }
}

// Timer-t indít a billentyű eltűntetésére
function scheduleForRemove(key, time) {
    setTimeout(function () {
        if (document.getElementById("gameboard").contains(key.element)) {
            removeKey(key);
        }
    }, time);
}

function updateStats() {
    var span = document.getElementById("hits");
    span.innerText = "Helyes/helytelen találatok: " + correctHits + " / " + wrongHits;
}

// Key factory
function removeKey(key) {
    document.getElementById("gameboard").removeChild(key.element);
    keysOnScreen.splice(keysOnScreen.findIndex(x => x === key), 1);
}

function generateKey(letter) {
    var key = new window.KeyWarrior.Key(letter);
    document.getElementById("gameboard").appendChild(key.element);
    keysOnScreen.push(key);
    return key;
}