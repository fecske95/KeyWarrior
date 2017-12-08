window.KeyWarrior = window.KeyWarrior || {};

class Key {
    constructor(char) {
        this.letter = char;

        this.element = document.createElement("div");
        this.element.classList.add("key");
        this.element.innerHTML = "<span>" + char + "</span>";

        this.container = document.createElement("div");

        if(char === ' ') {
            this.element.classList.add("keyclass-space");
            this.container.classList.add("space-container");
        }
        else {
            this.container.classList.add("key-container");
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