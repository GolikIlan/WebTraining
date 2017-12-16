"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Board {
    constructor(_rows, _cols, _logger) {
        this._rows = _rows;
        this._cols = _cols;
        this._logger = _logger;
        this._defaultToken = "-";
        this._board = new Array();
        this.initBoard();
        this._movesCount = 0;
    }
    initBoard() {
        for (let i = 0; i < this._rows; i++) {
            let colsArray = new Array();
            for (let j = 0; j < this._cols; j++) {
                colsArray.push(this._defaultToken);
            }
            this._board.push(colsArray);
        }
    }
    print() {
        for (let i = 0; i < this._rows; i++) {
            let colsArray = this._board[i];
            let colsOutput = "";
            for (let j = 0; j < this._cols; j++) {
                colsOutput += ` ${colsArray[j]} `;
            }
            this._logger.log(colsOutput);
        }
    }
    get availableMoves() {
        return (this._rows * this._cols) - this._movesCount;
    }
    nextMove(move) {
        let colsArray = this._board[move.rowIndex];
        let result = false;
        if (colsArray[move.columnIndex] === this._defaultToken) {
            colsArray[move.columnIndex] = move.token;
            this._movesCount++;
            result = true;
        }
        return result;
    }
}
exports.Board = Board;
//# sourceMappingURL=board.js.map