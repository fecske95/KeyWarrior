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

var paused = false;

window.onload = function () {
    startGame();
};

$(document).keydown(function (e) {
    var code = e.keyCode;
    var id = "keyboardkey-" + String.fromCharCode(code).toLowerCase();
    var backgroundImage = "url(images/key_pressed.png)";

    switch (code) {
        case 16:
            shiftHeld = true;
            id = "keyboardkey-shift";
            break;

        case 188:
            code = 44;
            id = "keyboardkey-comma";
            break;

        case 189:
            code = 45;
            id = "keyboardkey-minus";
            break;

        case 190:
            code = 46;
            id = "keyboardkey-period";
            break;

        case 32:
            id = "keyboardkey-space";
            backgroundImage = "url(images/space_pressed.png)";
            break;
    }

    var element = document.getElementById(id);
    if(element !== null) {
        element.style["background-image"] = backgroundImage;
    }

    if (keysOnScreen.length > 0) {
        var modifier = 32;

        if (shiftHeld || code <= 57 || code >= 91) {
            modifier = 0;
        }

        if (code + modifier === keysOnScreen[0].key) {
            removeKey(keysOnScreen[0], 1);
            if(paused) {
                resume();
            }
            if(code === currentText.charCodeAt(currentText.length)) {
                endGame();
            }
            correctHits++;
        } else {
            if (code !== 16) {
                pause();
                wrongHits++;
            }
        }
        updateStats();
    }
});

$(document).keyup(function (e) {
    var code = e.keyCode;
    var id = "keyboardkey-" + String.fromCharCode(code).toLowerCase();
    var backgroundImage = "url(images/key.png)";

    switch (code) {
        case 16:
            shiftHeld = false;
            id = "keyboardkey-shift";
            break;

        case 188:
            code = 44;
            id = "keyboardkey-comma";
            break;

        case 189:
            code = 45;
            id = "keyboardkey-minus";
            break;

        case 190:
            code = 46;
            id = "keyboardkey-period";
            break;

        case 32:
            id = "keyboardkey-space";
            backgroundImage = "url(images/space.png)";
            break;
    }
    var element = document.getElementById(id);
    if(element !== null) {
        element.style["background-image"] = backgroundImage;
    }
});

// A játék elindítása
function startGame() {
    var textLoader = new window.KeyWarrior.TextLoader();
    createKeyboard();
    textLoader.getRandomText(function (text) {
        currentText = text;

        generatorTimer = setInterval(generateNext, 600);
    });

    correctHits = 0;
    wrongHits = 0;
}

function updateStats() {
    var span = document.getElementById("hits");
    span.innerText = "Correct/Wrong: " + correctHits + " / " + wrongHits;
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

    scheduleForRemove(key);

    if(keysOnScreen.length > 0) {
        keysOnScreen[0].element.style["animation"] = "currentkey-mark 1s infinite";
    }

    if(paused) {
        resume();
    }
}

function scheduleForRemove(key) {
    setTimeout(function () {
        var element = document.getElementById("gameboard");
        if(element !== null && element.contains(key.container)) {
            document.getElementById("gameboard").removeChild(key.container);
        }
    }, 1000);  
}

// Key factory
function createKey(letter) {
    var key = new window.KeyWarrior.Key(letter);
    document.getElementById("gameboard").appendChild(key.container);
    keysOnScreen.push(key);
    setAnimationEnd(key);

    return key;
}

function setAnimationEnd(key) {
    key.container.addEventListener("animationend", function(e) {
        removeKey(key, 0);
    }, false);
}

function generateNext() {
    if(!paused) {
        var char = currentText[letterCounter];
        var key = createKey(char);

        // CSS Animáció beállítása
        key.container.style["animation-duration"] = keyAnimationTime + 's';

        if (keysOnScreen.findIndex(x => x === key) === 0) {
            key.element.style["animation"] = "currentkey-mark 1s infinite";
        }

        letterCounter++;

        if (letterCounter >= currentText.length) {
            clearInterval(generatorTimer);
            letterCounter = 0;
        }
    }
}

function createKeyboard() {
    for (var i = 48; i <= 122; i++) {
        if (i == 58) {
            i = 97;
        }

        createKeyboardKey(String.fromCharCode(i));
    }

    createKeyboardKey(' ');
    createKeyboardKey(',');
    createKeyboardKey('.');
    createKeyboardKey('-');
    createKeyboardKey('^');
}

function createKeyboardKey(letter) {
    var element = document.createElement("div");
    element.innerHTML = "<span>" + letter + "</span>";
    element.className = "keyboardkey";

    var id = "keyboardkey-" + letter;

    switch (letter) {
        case ' ':
            id = "keyboardkey-space";
            break;

        case ',':
            id = "keyboardkey-comma";
            break;

        case '.':
            id = "keyboardkey-period";
            break;

        case '-':
            id = "keyboardkey-minus";
            break;

            // Shift
        case '^':
            id = "keyboardkey-shift";
            element.innerHTML = "<span>" + "Shift" + "</span>";
            break;
    }

    element.setAttribute("id", id);
    document.getElementById("gameboard").appendChild(element);
    return element;
}

function pause() {
    for(var i = 0; i < keysOnScreen.length; i++) {
        keysOnScreen[i].container.style["-webkit-animation-play-state"] = "paused";
        keysOnScreen[i].container.style["-moz-animation-play-state"] = "paused";
        keysOnScreen[i].container.style["-o-animation-play-state"] = "paused";
        keysOnScreen[i].container.style["animation-play-state"] = "paused";
    }
    paused = true;
}

function resume() {
    for(var i = 0; i < keysOnScreen.length; i++) {
        keysOnScreen[i].container.style["-webkit-animation-play-state"] = "running";
        keysOnScreen[i].container.style["-moz-animation-play-state"] = "running";
        keysOnScreen[i].container.style["-o-animation-play-state"] = "running";
        keysOnScreen[i].container.style["animation-play-state"] = "running";
    }
    paused = false;
}

function endGame() {
    
}