var clickedThumb = null;

var charSpeed = 7;
window.localStorage.setItem('charSpeed', charSpeed);

var maxCharSpeed = 10;
var minCharSpeed = 1;

var difficultyCap = 10;

window.addEventListener("load", addListeners, true);
window.addEventListener("click", hideDropdownList, true);

function addListeners() {
    window.addEventListener("mouseup", mouseUp, true);
    window.addEventListener("mousedown", mouseDown, true);
    window.addEventListener("mousemove", mouseMove, true);

    document.getElementById("start").addEventListener("click", startGame, true);

    var difficultyButtons = document.querySelectorAll(".difficulty-button");
    for(var i = 0; i < difficultyButtons.length; i++) {
        difficultyButtons[i].addEventListener("click", setDifficulty, true);
    }

    document.getElementById("textlist-button").addEventListener("click", showList, true);
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

function startGame() {
    window.localStorage.setItem('indicator', document.getElementById('checkbox-textindicator').checked); 
    location.href='game.html';
}

function setCharSpeed(value) {
    charSpeed = value;
    window.localStorage.setItem("charSpeed", value);
}

/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function showList() {
    document.getElementById("text-list").classList.toggle("show");
}

// Close the dropdown menu if the user clicks outside of it
function hideDropdownList(event) {
  if (!event.target.matches('.dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}