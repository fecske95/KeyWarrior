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

var removeAnimation = function(e) {
    removeKey(0);
};

window.onload = function () {
    startGame();
};

$(document).keydown(function (e) {

    //handling SHIFT key
    var code = e.keyCode;
    if(code === 16) {
        shiftHeld = true;
    }

    // adding highlight style
    var id = keyboard.getIdForKeyCode(code);
    var backgroundImage = "url(images/key_pressed.png)";

    if (id === "keyboardkey-space") {
        backgroundImage = "url(images/space_pressed.png)";
    }

    var element = document.getElementById(id);
    if (element !== null) {
        element.style["background-image"] = backgroundImage;
    }
});

$(document).keypress(function (e) {
    var code = e.keyCode;
    
    if (keysOnScreen.length > 0) {
        
        if (code === keysOnScreen[0].key) {
            removeKey(1);

            correctHits++;
        } else {
            if (code !== 16) {
                wrongHits++;
            }
        }
        updateStats();
    }
});

$(document).keyup(function (e) {

    // handling SHIFT key
    var code = e.keyCode;
    if(code === 16) {
        shiftHeld = false;
    }

    // removing highlight style
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
        currentText = text;

        var textIndicator = document.getElementById("text-span");
        textIndicator.innerHTML = currentText;

        generatorTimer = setTimeout(generateNext, 1000);
    });

    correctHits = 0;
    wrongHits = 0;
}

function updateStats() {
    document.getElementById("correct-hits").innerText = correctHits;
    document.getElementById("wrong-hits").innerText = wrongHits;
}

function removeKey(reason) {
    if (reason === 1) {
        keysOnScreen[0].element.style["animation"] = "correct-key 1s 1";
        if (keysOnScreen.letter === ' ') {
            keysOnScreen[0].element.style["background-image"] = "url(images/space_green.png)";
        } else {
            keysOnScreen[0].element.style["background-image"] = "url(images/key_green.png)";
        }

    } else {
        keysOnScreen[0].element.style["animation"] = "missed-key 1s 1";
        if (keysOnScreen[0].letter === ' ') {
            keysOnScreen[0].element.style["background-image"] = "url(images/space_red.png)";
        } else {
            keysOnScreen[0].element.style["background-image"] = "url(images/key_red.png)";
        }
    }

    scheduleForRemove(keysOnScreen[0].container);
    keysOnScreen[0].container.removeEventListener("animationend", removeAnimation);
    keysOnScreen.shift();
    currentLetterCounter++;

    if (keysOnScreen.length > 0) {
        keysOnScreen[0].element.style["animation"] = "currentkey-mark 1s infinite";
    }

    if (currentLetterCounter >= currentText.length) {
        endGame();
    }
    else {
        generateNext();
    }

    var textIndicator = document.getElementById("text-span");
    textIndicator.innerHTML = textIndicator.innerHTML.slice(1, textIndicator.innerHTML.length);
}

function scheduleForRemove(keyElement) {
    setTimeout(function () {
        var gameboard = document.getElementById("gameboard");
        if (gameboard !== null && gameboard.contains(keyElement)) {
            document.getElementById("gameboard").removeChild(keyElement);
        }
    }, 1000);
}

function setAnimationEnd(key) {
    key.container.addEventListener("animationend", removeAnimation, false);
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

function endGame() {
    var percents = correctHits / currentText.length * 100;

    var panel = document.createElement("div");
    panel.className = "panel";
    panel.id = "stat-panel";
    document.body.appendChild(panel);

    var endtext = document.createElement("span");
    endtext.innerHTML = "Congratulations!";
    endtext.setAttribute("id", "endtext");
    panel.appendChild(endtext);

    var percentage = document.createElement("span");
    percentage.innerHTML = percents + '%';
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