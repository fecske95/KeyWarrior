window.KeyWarrior = window.KeyWarrior || {};

class Keyboard {
    constructor() {
        for (var i = 48; i <= 122; i++) {
            if (i == 58) {
                i = 97;
            }

            this.createKey(String.fromCharCode(i));
        }

        this.createKey(' ');
        this.createKey(',');
        this.createKey('.');
        this.createKey('-');
        this.createKey('^');
    }

    createKey(letter) {
        var element = document.createElement("div");
        element.innerHTML = "<span>" + letter + "</span>";
        element.className = "keyboardkey";

        var id = "keyboardkey-" + letter;

        switch (letter) {
            case ' ':
                id = "keyboardkey-space";
                break;

            case ',':
                id = "keyboardkey-comma";
                break;

            case '.':
                id = "keyboardkey-period";
                break;

            case '-':
                id = "keyboardkey-minus";
                break;

                // Shift
            case '^':
                id = "keyboardkey-shift";
                element.innerHTML = "<span>" + "Shift" + "</span>";
                break;
        }

        element.setAttribute("id", id);
        document.getElementById("gameboard").appendChild(element);
        return element;
    }

    getIdForKeyCode(keyCode) {
        var id = "keyboardkey-" + String.fromCharCode(keyCode).toLowerCase();

        switch (keyCode) {
            case 16:
                shiftHeld = false;
                id = "keyboardkey-shift";
                break;

            case 188:
                code = 44;
                id = "keyboardkey-comma";
                break;

            case 189:
                code = 45;
                id = "keyboardkey-minus";
                break;

            case 190:
                code = 46;
                id = "keyboardkey-period";
                break;

            case 32:
                id = "keyboardkey-space";
                break;
        }

        return id;
    }
}

window.KeyWarrior.Keyboard = Keyboard;