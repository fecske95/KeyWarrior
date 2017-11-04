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

        this.container.setAttribute("id", Key.getIdForCharacter(char));
        this.container.appendChild(this.element);
    }

    get key() {
        return this.letter.charCodeAt(0);
    }

    static getIdForCharacter(char) {
        var id = "key-" + char.toLowerCase();
        switch (char) {
            case ' ':
                id = "key-space";
                break;

            case ',':
                id = "key-comma";
                break;

            case '.':
                id = "key-period";
                break;

            case '-':
                id = "key-minus";
                break;
        }
        return id;
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