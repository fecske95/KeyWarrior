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

var countMiss = true;

var score = 0;
var multiplier = 1;
var maxMultiplier = 6;

var scorePerKey = 5;
var scorePerSpecialCharacter = 8;
var streak = 0;

var maxStars = 5;

var removeAnimation = function (e) {
    removeKey(0);
};

var difficulty;

window.addEventListener("load", initializeGame, true);

function initializeGame() {
    keyAnimationTime = parseFloat(window.localStorage.getItem("charSpeed"));

    if (window.localStorage.getItem("indicator") === "false") {
        document.getElementById("game-container").removeChild(document.getElementById("text-div"));
    }

    difficulty = parseInt(window.localStorage.getItem('difficulty'));

    if (difficulty === 0) {
        if (keyAnimationTime >= 6) {
            difficulty = 1;
        } else if (keyAnimationTime >= 3) {
            difficulty = 2;
        } else {
            difficulty = 3;
        }
    }

    console.log(difficulty);

    document.getElementById("pause-button").addEventListener("click", showMenu, true);
    startGame();
};

$(document).keydown(function (e) {
    if (!paused) {
        //handling SHIFT key
        var code = e.keyCode;
        if (code === 16) {
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
    }
});

$(document).keypress(function (e) {
    if (!paused) {
        var code = e.charCode || e.keyCode;

        if (keysOnScreen.length > 0) {

            if (code === keysOnScreen[0].key) {
                score += getScoreForChar(keysOnScreen[0].letter) * (difficulty + multiplier);
                removeKey(1);

                correctHits++;
                streak++;
            } else {
                if (countMiss && code !== 16) {
                    wrongHits++;
                    countMiss = false;
                    streak = 0;
                }
            }
            multiplier = DetermineMultiplier();
            updateStats();
        }
    }
});

$(document).keyup(function (e) {
    if (!paused) {
        // handling SHIFT key
        var code = e.keyCode;
        if (code === 16) {
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
    }
});

// A játék elindítása
function startGame() {
    var textLoader = new window.KeyWarrior.TextLoader();
    keyboard = new window.KeyWarrior.Keyboard();
    textLoader.getRandomText(window.localStorage.getItem("choosenText"), function (text) {
        currentText = text;

        var textIndicator = document.getElementById("text-span");
        if (textIndicator !== null) {
            textIndicator.innerHTML = currentText;
        }

        generatorTimer = setInterval(generateNext, 1000);
    });

    correctHits = 0;
    wrongHits = 0;
}

function updateStats() {
    document.getElementById("correct-hits").innerText = correctHits;
    document.getElementById("wrong-hits").innerText = wrongHits;
    document.getElementById("score-span").innerText = score;
    document.getElementById("mul-span").innerText = multiplier + 'x';
}

function removeKey(reason) {
    if (reason === 1) {
        keysOnScreen[0].element.style["animation"] = "correct-key 1s 1";
        if (keysOnScreen[0].letter === ' ') {
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
        wrongHits++;
        updateStats();
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
    } else {
        generateNext();
    }

    var textIndicator = document.getElementById("text-span");
    if (textIndicator !== null) {
        textIndicator.innerHTML = textIndicator.innerHTML.slice(1, textIndicator.innerHTML.length);
    }

    countMiss = true;
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

        if(generatorTimer !== null) {
            clearInterval(generatorTimer);
        }
    }
}

function DetermineMultiplier() {
    var mul = Math.ceil(streak / (15 + streak * 0.1));
    if (mul > maxMultiplier) {
        mul = maxMultiplier;
    }

    return mul;
}

function endGame() {
    var percents = Math.floor(Math.abs(currentText.length - wrongHits) / currentText.length * 100);
    var maxScore = 0;
    for (var i = 0; i < currentText.length; i++) {
        maxScore += getScoreForChar(currentText[i]);
    }

    var stars = Math.floor((score / maxScore * 100) / 20);
    if (stars > maxStars) {
        stars = maxStars;
    }

    var panel = document.createElement("div");
    panel.className = "panel";
    panel.id = "stat-panel";
    document.body.appendChild(panel);

    var endtext = document.createElement("span");
    endtext.innerHTML = "Congratulations!";
    endtext.setAttribute("id", "endtext");
    panel.appendChild(endtext);

    var scoretext = document.createElement("span");
    scoretext.innerHTML = "Score: " + score;
    scoretext.setAttribute("id", "scoretext");
    panel.appendChild(scoretext);

    var stardiv = document.createElement("div");
    stardiv.setAttribute("id", "star-div");
    panel.appendChild(stardiv);

    var starCounter = 1;
    for (var i = 0; i < maxStars; i++) {
        var starElement = document.createElement("div");
        starElement.classList.add("star");

        if (starCounter <= stars) {
            starElement.classList.add("star-full");
            starCounter++;
        }
        stardiv.appendChild(starElement);
    }

    var percentage = document.createElement("span");
    percentage.innerHTML = percents + '%';
    percentage.setAttribute("id", "percentage");
    panel.appendChild(percentage);

    var exitbutton = document.createElement("button");
    exitbutton.className = "keybutton";
    exitbutton.innerHTML = "Finish";
    exitbutton.setAttribute("id", "exitbutton");
    exitbutton.addEventListener("click", function() {
        location.href='index.html'; 
    }, true);
    panel.appendChild(exitbutton);

    paused = true;
}

function showMenu() {
    var panel = document.createElement("div");
    panel.className = "panel";
    panel.setAttribute("id", "menu-panel");
    document.body.appendChild(panel);

    var pauseText = document.createElement("span");
    pauseText.setAttribute("id", "pause-text");
    pauseText.innerText = "Paused";
    panel.appendChild(pauseText);

    var closeButton = document.createElement("button");
    closeButton.setAttribute("id", "close-button");
    closeButton.addEventListener("click", hideMenu);
    closeButton.innerText = "Resume";
    panel.appendChild(closeButton);

    var exitButton = document.createElement("button");
    exitButton.setAttribute("id", "exit-button");
    exitButton.addEventListener("click", function(e) {
        location.href = "index.html";
    });
    exitButton.innerText = "Exit";
    panel.appendChild(exitButton);

    for(var i = 0; i < keysOnScreen.length; i++) {
        keysOnScreen[i].container.classList.add("paused");
    }

    paused = true;
}

function hideMenu() {
    document.body.removeChild(document.getElementById("menu-panel"));

    for(var i = 0; i < keysOnScreen.length; i++) {
        keysOnScreen[i].container.classList.remove("paused");
    }

    paused = false;
}

function getScoreForChar(char) {
    switch (char) {
        // fallthrough
        case '-':
        case ',':
        case '.':
            return scorePerSpecialCharacter;

        case ' ':
            return 2;

        default:
            return scorePerKey;
    }
}