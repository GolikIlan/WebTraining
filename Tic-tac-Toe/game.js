"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const board_1 = require("./board");
const analizer_1 = require("./analizer");
const logger_1 = require("./logger");
class Game {
    constructor(_rows, _cols) {
        this._rows = _rows;
        this._cols = _cols;
        this._logger = new logger_1.Logger();
        this.init();
    }
    init() {
        if (this._cols === this._rows) {
            this._totalMovesCount = 0;
            this._history = new Array();
            this._board = new board_1.Board(this._rows, this._cols, this._logger);
            this._players = new Map();
            this._analizer = new analizer_1.Analizer(this._rows);
        }
        else {
            throw new Error("Fatal error the number of rows should be equals to the number of columns.");
        }
    }
    get board() {
        return this._board;
    }
    get status() {
        return this._analizer.winnerState.isWinner === false ? this._board.availableMoves == 0 ? common_1.GameStatus[common_1.GameStatus.Draw] : common_1.GameStatus[common_1.GameStatus.InProgress] : common_1.GameStatus[common_1.GameStatus.Completed];
    }
    addPlayer(player) {
        try {
            if (this._players.size == 2) {
                throw new Error("No more than two players can play the game.");
            }
            this._players.set(player.token, player);
        }
        catch (error) {
            this._logger.log(error);
        }
    }
    nextMove(rowIndex, colIndex) {
        let result = false;
        try {
            if (this._players.size < 2) {
                throw new Error("there must be two player to play the game");
            }
            if (this._analizer.hasWinner == false) {
                let currentPlayerIndex = this._totalMovesCount % 2;
                let currentPlayerToken = Array.from(this._players.keys())[currentPlayerIndex];
                result = this.performMove(new MoveImpl(rowIndex, colIndex, currentPlayerToken));
            }
        }
        catch (error) {
            this._logger.log(`next move action failed ${error}`);
        }
        return result;
    }
    performMove(move) {
        let result = this._board.nextMove(move);
        if (result === true) {
            this._totalMovesCount++;
            this._analizer.updateAnalizer(move);
            this._history.push(move);
        }
        return result;
    }
    printHistory() {
        if (this._history.length === 0) {
            this._logger.log("still no history of moves");
            return;
        }
        for (let index = 0; index < this._history.length; index++) {
            const element = this._history[index];
            this._logger.log(`token ${element.token} to [${element.rowIndex},${element.columnIndex}]`);
        }
    }
    printWinner() {
        let token = this._analizer.winnerState.moves[0].token;
        if (token === undefined)
            throw Error("fatal error winner state has wrong token");
        let player = this._players.get(token);
        if (player === undefined)
            throw Error("fatal error no player with that token");
        this._logger.log(`${player.name} won!`);
    }
    printSummary() {
        if (this._analizer.winnerState.isWinner === false && this._board.availableMoves > 0) {
            this._logger.log("Game is in progress");
            this.printHistory();
        }
        else if (this._analizer.winnerState.isWinner === false && this._board.availableMoves == 0) {
            this._logger.log("The game ended in a draw");
            this.printHistory();
        }
        else if (this._analizer.winnerState.isWinner === true) {
            this.printWinner();
            this.printHistory();
        }
    }
}
exports.Game = Game;
class MoveImpl {
    constructor(_rowIndex, _columnIndex, _token) {
        this._rowIndex = _rowIndex;
        this._columnIndex = _columnIndex;
        this._token = _token;
    }
    get token() {
        return this._token;
    }
    get columnIndex() {
        return this._columnIndex;
    }
    get rowIndex() {
        return this._rowIndex;
    }
}
//# sourceMappingURL=game.js.map