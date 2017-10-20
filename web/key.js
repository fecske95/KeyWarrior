window.KeyWarrior = window.KeyWarrior || {};

class Key {
    constructor(char) {
        this.letter = char;

        this.element = document.createElement("div");
        this.element.setAttribute("id", "key-" + char.toLowerCase());
        this.element.className = "key";
        this.element.innerHTML = "<span>" + char + "</span>";
        this.element.style["animation-timing-function"] = "linear";
    }

    getKey() {
        return this.letter.charCodeAt(0);
    }
}

window.KeyWarrior.Key = Key;
