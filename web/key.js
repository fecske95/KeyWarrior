window.KeyWarrior = window.KeyWarrior || {};

class Key {
    constructor(char) {
        this.letter = char;

        this.element = document.createElement("div");
        this.element.setAttribute("id", "key-" + char);
        this.element.className = "key";
        this.element.innerHTML = "<span>" + char + "</span>";
        /*
        this.element.setAttribute("style", "animation: key-line-1 4s 1;");
        */
    }

    getKey() {
        return this.letter.charCodeAt(0);
    }
}

window.KeyWarrior.Key = Key;
