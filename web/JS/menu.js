var preAddedTexts = [
    "Grand_Theft_Auto_V",
    "Geoffrey_Lewis_(actor)"
];

var clickedThumb = null;

var charSpeed = 7;
var choosenText = preAddedTexts[0];
window.localStorage.setItem('charSpeed', charSpeed);
window.localStorage.setItem('difficulty', 0);
window.localStorage.setItem('choosenText', choosenText);

var maxCharSpeed = 10;
var minCharSpeed = 1;

var difficultyCap = 10;

window.addEventListener("load", addListeners, true);

function addListeners() {
    window.addEventListener("mouseup", mouseUp, true);
    window.addEventListener("mousedown", mouseDown, true);
    window.addEventListener("mousemove", mouseMove, true);

    document.getElementById("start").addEventListener("click", startGame, true);

    var difficultyButtons = document.querySelectorAll(".difficulty-button");
    for(var i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener("click", setDifficulty, true);
    }

    document.getElementById("textlist-button").addEventListener("click", 
    function() {
        var textMenu = document.getElementById("textmenu-div");
        if(textMenu.classList.contains("disabled")) {
            textMenu.classList.remove("disabled");
        }
    }, true);

    document.getElementById("button-choose").addEventListener("click", closeTextList, true);

    for(var i = 0; i < preAddedTexts.length; i++) {
        addTextChoice(preAddedTexts[i]);
    }
}

function mouseUp(e) {
    clickedThumb = null;
}

function mouseDown(e) {
    clickedThumb = e.target;
}

function mouseMove(e) {
    if (clickedThumb !== null && clickedThumb.className === "pointer") {
        var bounds = clickedThumb.parentElement.getBoundingClientRect();
        var x = e.clientX - bounds.left;
        if (x > bounds.width) {
            x = bounds.width;
        } else if (x < 1) {
            x = 1;
        }
        setCharSpeed(((bounds.width - x) / 70 + 1).toFixed(1));
        clickedThumb.style.left = x + 'px';

        var valText = document.querySelector('#' + clickedThumb.parentElement.id + " + " + ".pointer-value");
        valText.innerHTML = (x / 70).toFixed(1);
    }
}

function setDifficulty() {
    var diff = this.id.toUpperCase();
    window.localStorage.setItem('difficulty', diff);

    var diffValue;

    document.getElementById("scrollbar-keyspeed").classList.add("disabled");
    document.getElementById("charspeed-span").classList.add("disabled");
    document.querySelector("#scrollbar-keyspeed + .pointer-value").classList.add("disabled");

    switch (diff) {
        case "EASY":
            diffValue = 1;
            break;
        case "MEDIUM":
            diffValue = 2;
            break;
        case "HARD":
            diffValue = 3;
            break;

        default:
            diffValue = 0;

            document.getElementById("charspeed-span").classList.remove("disabled");
            document.getElementById("scrollbar-keyspeed").classList.remove("disabled");
            document.querySelector("#scrollbar-keyspeed + .pointer-value").classList.remove("disabled");
            break;
    }
    var speed = (difficultyCap - diffValue * 3);
    setCharSpeed(speed);
}

function closeTextList() {
    document.getElementById("textmenu-div").classList.add("disabled");
    document.getElementById("textlist-button").innerHTML = choosenText.replace(/\_/ig, ' ');
}

function startGame() {
    window.localStorage.setItem('indicator', document.getElementById('checkbox-textindicator').checked); 
    location.href='game.html';
}

function setCharSpeed(value) {
    charSpeed = value;
    window.localStorage.setItem("charSpeed", value);
}

function addTextChoice(article) {
    var textList = document.getElementById("textlist");

    var container = document.createElement("div");
    container.classList.add("textradio-container");

    var radioButton = document.createElement("input");
    radioButton.setAttribute("type", "radio");
    radioButton.setAttribute("name", "text");
    radioButton.setAttribute("id", article);
    radioButton.addEventListener("click", 
    function() {
        choosenText = this.id;
        window.localStorage.setItem('choosenText', choosenText);
    }, true);

    var radioLabel = document.createElement("label");
    radioLabel.setAttribute("for", article);
    radioLabel.innerText = article.replace(/\_/ig, ' ');

    container.appendChild(radioButton);
    container.appendChild(radioLabel);
    
    textList.appendChild(container);
}