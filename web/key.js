window.KeyWarrior = window.KeyWarrior || {};

class Key {
    constructor(char) {
        this.letter = char;

        this.element = document.createElement("div");
        this.element.className = "key";
        this.element.innerHTML = "<span>" + char + "</span>";

        this.container = document.createElement("div");

        if(char === ' ') {
            this.element.className = "keyclass-space";
            this.container.className = "space-container";
            this.container.setAttribute("id", "key-space");
        }
        else {
            this.container.className = "key-container";
            this.container.setAttribute("id", "key-" + char.toLowerCase());
        }

        this.container.appendChild(this.element);
    }

    getKey() {
        return this.letter.charCodeAt(0);
    }
}

window.KeyWarrior.Key = Key;