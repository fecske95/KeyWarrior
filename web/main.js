// Namespace definíció, minden js fájl tetejére kell
window.KeyWarrior = window.KeyWarrior || {};

// A létező billentyűket tartalmaző tömb
var keysOnScreen = [];

// Le van-e nyomva a shift?
var shiftHeld = false;

// textloader-ből betöltött szöveg
var currentText;

//Helyes/helytelen találatok
var correctHits = 0;
var wrongHits = 0;

var letterCounter = 0;

var generatorTimer;

// Gyakorlatilag a billentyűk sebessége (másodpercben vett idő, amíg elér a helyére)
var keyAnimationTime = 6;

window.onload = function () {
    startGame();
};

$(document).keydown(function (e) {
    if (e.keyCode === 16) {
        shiftHeld = true;
    }

    if (keysOnScreen.length > 0) {
        var modifier = 32;

        if (shiftHeld || e.keyCode <= 57) {
            modifier = 0;
        }

        if (e.keyCode + modifier === keysOnScreen[0].getKey()) {
            removeKey(keysOnScreen[0], 1);
            correctHits++;
        } else {
            if (e.keyCode !== 16) {
                wrongHits++;
            }
        }
        updateStats();
    }
});

$(document).keyup(function (e) {
    if (e.keyCode == 16) {
        shiftHeld = false;
    }
});

// A játék elindítása
function startGame() {
    var textLoader = new window.KeyWarrior.TextLoader();
    createKeyboard();
    textLoader.getRandomText(function (text) {

        currentText = text;

        generatorTimer = setInterval(() => {
            var char = currentText[letterCounter];
            var key = generateKey(char);

            // CSS Animáció beállítása
            key.container.style["animation-duration"] = keyAnimationTime + 's';

            if (keysOnScreen.findIndex(x => x === key) == 0) {
                key.element.style["animation"] = "currentkey-mark 1s infinite";
            }

            scheduleForRemove(key, keyAnimationTime * 1000);
            letterCounter++;

            if (letterCounter >= currentText.length) {
                clearInterval(generatorTimer);
                letterCounter = 0;
            }
        }, 400);
    });

    correctHits = 0;
    wrongHits = 0;
}

// Timer-t indít a billentyű eltűntetésére
function scheduleForRemove(key, time) {
    setTimeout(function () {
        if (document.getElementById("gameboard").contains(key.container)) {
            removeKey(key, 0);
        }
    }, time);
}

function updateStats() {
    var span = document.getElementById("hits");
    span.innerText = "Helyes/helytelen találatok: " + correctHits + " / " + wrongHits;
}

function removeKey(key, reason) {
    keysOnScreen.splice(keysOnScreen.findIndex(x => x === key), 1);

    if (reason === 1) {
        key.element.style["animation"] = "correct-key 1s 1";
        if (key.letter === ' ') {
            key.element.style["background-image"] = "url(images/space_green.png)";
        } else {
            key.element.style["background-image"] = "url(images/key_green.png)";
        }

    } else {
        key.element.style["animation"] = "missed-key 1s 1";
        if (key.letter === ' ') {
            key.element.style["background-image"] = "url(images/space_red.png)";
        } else {
            key.element.style["background-image"] = "url(images/key_red.png)";
        }
    }

    var keyToRemove = key;
    setTimeout(function () {
        keyToRemove.container.removeChild(keyToRemove.element);
        document.getElementById("gameboard").removeChild(keyToRemove.container);
    }, 1000);

    keysOnScreen[0].element.style["animation"] = "currentkey-mark 1s infinite";
}

// Key factory
function generateKey(letter) {
    var key = new window.KeyWarrior.Key(letter);
    document.getElementById("gameboard").appendChild(key.container);
    keysOnScreen.push(key);
    return key;
}

function createKeyboard() {
    var gameboard = document.getElementById("gameboard");

    for (var i = 48; i <= 122; i++) {
        if (i == 58) {
            i = 97;
        }

        gameboard.appendChild(createKeyboardKey(String.fromCharCode(i)));
    }
    gameboard.appendChild(createKeyboardKey(' '));
}

function createKeyboardKey(letter) {
    var element = document.createElement("div");

    if(letter === ' ') {
        element.setAttribute("id", "keyboardkey-space");
    }
    else {
        element.setAttribute("id", "keyboardkey-" + letter);
    }

    element.className = "keyboardkey";
    element.innerHTML = "<span>" + letter + "</span>";
    element.style["animation-timing-function"] = "linear";

    return element;
}