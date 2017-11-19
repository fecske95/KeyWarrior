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
var currentLetterCounter = 0;

var generatorTimer;

// Gyakorlatilag a billentyűk sebessége (másodpercben vett idő, amíg elér a helyére)
var keyAnimationTime = 6;

var paused = false;

var keyboard;

window.onload = function () {
    startGame();
};

$(document).keydown(function (e) {
    var code = e.keyCode;
    var id = keyboard.getIdForKeyCode(code);
    var backgroundImage = "url(images/key_pressed.png)";

    if(code === 16) {
        shiftHeld = true;
    }

    if (id === "keyboardkey-space") {
        backgroundImage = "url(images/space_pressed.png)";
    }

    var element = document.getElementById(id);
    if (element !== null) {
        element.style["background-image"] = backgroundImage;
    }

    if (keysOnScreen.length > 0) {
        var modifier = 32;

        if (shiftHeld || code <= 57 || code >= 91) {
            modifier = 0;
        }

        if (code + modifier === keysOnScreen[0].key) {
            removeKey(keysOnScreen[0], 1);
            if (paused) {
                resume();
            }

            var textIndicator = document.getElementById("text-span");
            textIndicator.innerHTML = textIndicator.innerHTML.slice(1, textIndicator.innerHTML.length);

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
    var id = keyboard.getIdForKeyCode(e.keyCode);
    var backgroundImage = "url(images/key.png)";

    if (id === "keyboardkey-space") {
        backgroundImage = "url(images/space.png)";
    }

    var element = document.getElementById(id);
    if (element !== null) {
        element.style["background-image"] = backgroundImage;
    }
});

// A játék elindítása
function startGame() {
    var textLoader = new window.KeyWarrior.TextLoader();
    keyboard = new window.KeyWarrior.Keyboard();
    textLoader.getRandomText(function (text) {
        // currentText = text;
        currentText = "text";

        var textIndicator = document.getElementById("text-span");
        textIndicator.innerHTML = currentText;

        generatorTimer = setInterval(generateNext, 600);
    });

    correctHits = 0;
    wrongHits = 0;
}

function updateStats() {
    document.getElementById("correct-hits").innerText = correctHits;
    document.getElementById("wrong-hits").innerText = wrongHits;
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
    currentLetterCounter++;

    if (currentLetterCounter === currentText.length) {
        endGame();
    }

    if (keysOnScreen.length > 0) {
        keysOnScreen[0].element.style["animation"] = "currentkey-mark 1s infinite";
    }

    if (paused) {
        resume();
    }
}

function scheduleForRemove(key) {
    setTimeout(function () {
        var element = document.getElementById("gameboard");
        if (element !== null && element.contains(key.container)) {
            document.getElementById("gameboard").removeChild(key.container);
        }
    }, 1000);
}

function setAnimationEnd(key) {
    key.container.addEventListener("animationend", function (e) {
        removeKey(key, 0);
    }, false);
}

function generateNext() {
    if (!paused) {
        var char = currentText[letterCounter];
        var key = window.KeyWarrior.Key.createKey(char);

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

function pause() {
    for (var i = 0; i < keysOnScreen.length; i++) {
        keysOnScreen[i].container.style["-webkit-animation-play-state"] = "paused";
        keysOnScreen[i].container.style["-moz-animation-play-state"] = "paused";
        keysOnScreen[i].container.style["-o-animation-play-state"] = "paused";
        keysOnScreen[i].container.style["animation-play-state"] = "paused";
    }
    paused = true;
}

function resume() {
    for (var i = 0; i < keysOnScreen.length; i++) {
        keysOnScreen[i].container.style["-webkit-animation-play-state"] = "running";
        keysOnScreen[i].container.style["-moz-animation-play-state"] = "running";
        keysOnScreen[i].container.style["-o-animation-play-state"] = "running";
        keysOnScreen[i].container.style["animation-play-state"] = "running";
    }
    paused = false;
}

function endGame() {
    var panel = document.createElement("div");
    panel.className = "panel";
    panel.id = "stat-panel";
    document.body.appendChild(panel);

    var endtext = document.createElement("span");
    endtext.innerHTML = "Congratulations!";
    endtext.setAttribute("id", "endtext");
    panel.appendChild(endtext);

    var percentage = document.createElement("span");
    percentage.innerHTML = "50%";
    percentage.setAttribute("id", "percentage");
    panel.appendChild(percentage);

    var exitbutton = document.createElement("button");
    exitbutton.className = "keybutton";
    exitbutton.innerHTML = "Finish";
    exitbutton.setAttribute("id", "exitbutton");
    exitbutton.setAttribute("onclick", "location.href='index.html';");
    panel.appendChild(exitbutton);

    document.getElementById("game-container").style["filter"] = "blur(5px)";
}