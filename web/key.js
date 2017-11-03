window.KeyWarrior = window.KeyWarrior || {};

class Key {
    constructor(char) {
        this.letter = char;

        this.element = document.createElement("div");
        this.element.className = "key";
        this.element.innerHTML = "<span>" + char + "</span>";

        this.container = document.createElement("div");

        // Speciális karakterek kezelése

        var id = "key-" + char.toLowerCase();
        this.container.className = "key-container";

        switch (char) {
            case ' ':
                this.element.className = "keyclass-space";
                this.container.className = "space-container";
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

        this.container.setAttribute("id", id);
        this.container.appendChild(this.element);
    }

    get key() {
        return this.letter.charCodeAt(0);
    }
}

window.KeyWarrior.Key = Key;