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
            wrongHits++;
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

        // Ideiglenes megoldás a szűrésre
        for (var i = 0; i < text.length; i++) {
            var code = text.charCodeAt(i);
            if (code > 48 && code < 90 && !(code > 57 && code < 65)) {
                currentText += text[i];
            }
        }

        generatorTimer = setInterval(() => {
            var key = generateKey(currentText[letterCounter]);

            // CSS Animáció beállítása
            key.container.style["animation-duration"] = keyAnimationTime + 's';

            scheduleForRemove(key, keyAnimationTime * 1000);
            letterCounter++;

            if (letterCounter >= currentText.length) {
                clearInterval(generatorTimer);
                letterCounter = 0;
            }
        }, 2000);
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
    //keysOnScreen[0].element.style["animation"] = "currentkey-outline 1s infinite";

    if (reason === 1) {
        key.element.style["animation"] = "correct-key 1s 1";
        key.element.style["background-image"] = "url(images/key_green.png)";
    } else {
        key.element.style["animation"] = "missed-key 1s 1";
        key.element.style["background-image"] = "url(images/key_red.png)";
    }

    var keyToRemove = key;
    setTimeout(function () {
        keyToRemove.container.removeChild(keyToRemove.element);
        document.getElementById("gameboard").removeChild(keyToRemove.container);
    }, 1000);

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
}

function createKeyboardKey(letter) {
    var element = document.createElement("div");
    element.setAttribute("id", "keyboardkey-" + letter);
    element.className = "keyboardkey";
    element.innerHTML = "<span>" + letter + "</span>";
    element.style["animation-timing-function"] = "linear";
    return element;
}