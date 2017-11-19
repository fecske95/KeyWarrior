window.KeyWarrior = window.KeyWarrior || {};

class Key {
    constructor(char) {
        this.letter = char;

        this.element = document.createElement("div");
        this.element.className = "key";
        this.element.innerHTML = "<span>" + char + "</span>";

        this.container = document.createElement("div");

        this.container.className = "key-container";

        if(char === ' ') {
            this.element.className = "keyclass-space";
            this.container.className = "space-container";
        }

        this.container.classList.add(Key.getClassForCharacter(char));
        this.container.appendChild(this.element);
    }

    get key() {
        return this.letter.charCodeAt(0);
    }

    static getClassForCharacter(char) {
        var classname = "key-" + char.toLowerCase();
        switch (char) {
            case ' ':
                classname = "key-space";
                break;

            case ',':
                classname = "key-comma";
                break;

            case '.':
                classname = "key-period";
                break;

            case '-':
                classname = "key-minus";
                break;
        }
        return classname;
    }

    static createKey(letter) {
        var key = new this(letter);
        document.getElementById("gameboard").appendChild(key.container);
        keysOnScreen.push(key);
        setAnimationEnd(key);
    
        return key;      
    }
}

window.KeyWarrior.Key = Key;