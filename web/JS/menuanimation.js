var animationTimer;

var floatingKeys = [];

var windowWidth = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

var windowHeight = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

window.addEventListener("load", initializeAnimation, true);

function initializeAnimation() {
    generateFloatingKeys();
    startAnimations();
};

function generateFloatingKeys() {
    var keyCount = Math.floor((Math.random() * 20) + 10);
    for(var i = 0; i < keyCount; i++) {
        var key = generateRandomKey();
        key.setAttribute("id", "key-" + i);
    }
}

function startAnimations() {
    for(var i = 0; i < floatingKeys.length; i++) {
        setAnimation(i);
    }
};

function setAnimation(keyId) {
    var id = "key-" + keyId;
    var seed = Math.random();
    
    var elementOpacity = document.getElementById(id).style["opacity"];
    var targetOpacity = 0;
    if(elementOpacity <= 0) {
        targetOpacity = 1;
    }

    if(seed < 0.5) {
        $('#' + id).animate({ top: Math.floor((Math.random() * windowHeight - 200) + 100) + "px", opacity: targetOpacity }, Math.floor((Math.random() * 10000) + 5000), function() {
            setAnimation(keyId);
        });
    }
    else {
        $('#' + id).animate({ left: Math.floor((Math.random() * windowWidth - 200) + 100) + "px", opacity: targetOpacity }, Math.floor((Math.random() * 10000) + 5000), function() {
            setAnimation(keyId);
        });
    }
}

function generateRandomKey() {
    var key = document.createElement("div");
    key.className = "floating-key";
    key.style["opacity"] = Math.random();
    key.style["left"] = Math.floor((Math.random() * windowWidth - 200) + 100) + "px";
    key.style["top"] = Math.floor((Math.random() * windowHeight - 200) + 100)  + "px";

    var keySize = Math.floor((Math.random() * 70) + 20);

    key.style["width"] = keySize + "px";
    key.style["height"] = keySize + "px"; 
    key.style["background-size"] = keySize + "px";
    document.getElementById("key-container").appendChild(key);
    floatingKeys.push(key);
    return key;
}