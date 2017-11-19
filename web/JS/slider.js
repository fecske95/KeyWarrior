var clickedThumb = null;

addListeners();

function addListeners() {
    window.addEventListener("mouseup", mouseUp, true);
    window.addEventListener("mousedown", mouseDown, true);
    window.addEventListener("mousemove", mouseMove, true);
}

function mouseUp(e) {
    clickedThumb = null;
}

function mouseDown(e) {
    clickedThumb = e.target;
}

function mouseMove(e) {
    if(clickedThumb !== null) {
        var bounds = clickedThumb.parentElement.getBoundingClientRect();
        var x = e.clientX - bounds.left;
        if(x > bounds.width) {
            x = bounds.width;
        }
        else if(x < 0) {
            x = 0;
        }
        clickedThumb.style.left = x + 'px';
    }
}