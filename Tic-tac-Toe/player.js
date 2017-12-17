"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(name, token) {
        this.name = name;
        this.token = token;
        this._score = 0;
    }
    incrementScore() {
        this._score++;
    }
    get score() {
        return this._score;
    }
}
exports.Player = Player;
//# sourceMappingURL=player.js.map