/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = __webpack_require__(1);
const player_1 = __webpack_require__(6);
let game = new game_1.Game(3, 3);
game.addPlayer(new player_1.Player('John Doe', 'x'));
game.addPlayer(new player_1.Player('Jason Bourne', 'o'));
game.board.print();
console.log(game.status);
game.printSummary();
let resOfMove;
resOfMove = game.nextMove(0, 0);
resOfMove = game.nextMove(0, 0);
resOfMove = game.nextMove(1, 1);
resOfMove = game.nextMove(0, 2);
resOfMove = game.nextMove(2, 2);
resOfMove = game.nextMove(0, 1);
resOfMove = game.nextMove(2, 1);
game.board.print();
game.printSummary();
/*variation tests*/
/*let game = new Game(3,3);

game.addPlayer(new Player('John Doe', 'x'));
game.addPlayer(new Player('Jason Bourne', 'o'));

game.board.print();

console.log(game.status);
game.printSummary();

let resOfMove:boolean;
resOfMove = game.nextMove(0, 0);
resOfMove = game.nextMove(0, 0);
resOfMove = game.nextMove(1, 1);
resOfMove = game.nextMove(0, 2);
resOfMove = game.nextMove(2, 2);
resOfMove = game.nextMove(1, 2);
resOfMove = game.nextMove(2, 1);
resOfMove = game.nextMove(1,0);
resOfMove = game.nextMove(2,0);
game.board.print();

game.printSummary();*/
/*let game = new Game(3,3);

game.addPlayer(new Player('John Doe', 'x'));
game.addPlayer(new Player('Jason Bourne', 'o'));

game.board.print();

console.log(game.status);
game.printSummary();

let resOfMove:boolean;
resOfMove = game.nextMove(0, 0);
resOfMove = game.nextMove(0, 0);
resOfMove = game.nextMove(1, 1);
resOfMove = game.nextMove(1, 0);
resOfMove = game.nextMove(2, 2);
resOfMove = game.nextMove(2, 0);
resOfMove = game.nextMove(2, 1);
resOfMove = game.nextMove(1,0);
resOfMove = game.nextMove(2,0);
game.board.print();

game.printSummary();*/
//diagonals tests
/*let game = new Game(3,3);
game.addPlayer(new Player('John Doe', 'x'));
game.addPlayer(new Player('Jason Bourne', 'o'));

game.board.print();

console.log(game.status);
game.printSummary();

let resOfMove:boolean;
resOfMove = game.nextMove(0, 0);
resOfMove = game.nextMove(0, 0);
resOfMove = game.nextMove(0, 2);
resOfMove = game.nextMove(1, 1);
resOfMove = game.nextMove(1, 2);
resOfMove = game.nextMove(2, 2);
resOfMove = game.nextMove(2, 1);
resOfMove = game.nextMove(1,0);
resOfMove = game.nextMove(2,0);
game.board.print();

game.printSummary();*/
/*let game = new Game(3,3);
game.addPlayer(new Player('John Doe', 'x'));
game.addPlayer(new Player('Jason Bourne', 'o'));

game.board.print();

console.log(game.status);
game.printSummary();

let resOfMove:boolean;
resOfMove = game.nextMove(0, 0);
resOfMove = game.nextMove(0, 0);
resOfMove = game.nextMove(1, 1);
resOfMove = game.nextMove(1, 1);
resOfMove = game.nextMove(2, 2);
resOfMove = game.nextMove(2, 0);
resOfMove = game.nextMove(2, 1);
resOfMove = game.nextMove(0,2);
resOfMove = game.nextMove(2,0);
game.board.print();

game.printSummary();*/
//draw test
/*let game = new Game(3,3);
game.addPlayer(new Player('John Doe', 'x'));
game.addPlayer(new Player('Jason Bourne', 'o'));

game.board.print();

console.log(game.status);
game.printSummary();

let resOfMove:boolean;
resOfMove = game.nextMove(0, 0);
resOfMove = game.nextMove(0, 1);
resOfMove = game.nextMove(0, 2);
resOfMove = game.nextMove(1, 0);
resOfMove = game.nextMove(2, 0);
resOfMove = game.nextMove(1, 1);
resOfMove = game.nextMove(1, 2);
resOfMove = game.nextMove(2, 2);
resOfMove = game.nextMove(2, 1);
game.board.print();

game.printSummary();*/ 


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(2);
const board_1 = __webpack_require__(3);
const analizer_1 = __webpack_require__(4);
const logger_1 = __webpack_require__(5);
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


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GameStatus;
(function (GameStatus) {
    GameStatus[GameStatus["InProgress"] = 0] = "InProgress";
    GameStatus[GameStatus["Draw"] = 1] = "Draw";
    GameStatus[GameStatus["Completed"] = 2] = "Completed";
})(GameStatus = exports.GameStatus || (exports.GameStatus = {}));


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AnlisysHelperBase extends Array {
    constructor(_lim) {
        super();
        this._lim = _lim;
        this._isWinner = false;
        this._shouldCheckState = true;
    }
    updateState(move) {
        let result = new DefaultState();
        if (this.length === 0) {
            this.addMove(move);
        }
        else if (this._shouldCheckState === true && this.isWinner === false) {
            let token = move.token;
            var lastUpdate = this[this.length - 1];
            let isASequenceOfSameToken = (lastUpdate.token === token);
            let canAddAdditionalToken = this.addMove(move);
            this._isWinner = canAddAdditionalToken === false && isASequenceOfSameToken === true;
            this._shouldCheckState = isASequenceOfSameToken;
            if (this._isWinner) {
                result = this;
            }
        }
        return result;
    }
    addMove(move) {
        this.push(move);
        return this.length < this._lim;
    }
    get isWinner() {
        return this._isWinner;
    }
    get moves() {
        return this;
    }
}
class DiagonalAnlisysHelper extends AnlisysHelperBase {
    constructor(diagonalMatchingRule, lim) {
        super(lim);
        this.diagonalMatchingRule = diagonalMatchingRule;
    }
    updateState(move) {
        let result = new DefaultState();
        if (this.diagonalMatchingRule(move, this._lim) === true) {
            return super.updateState(move);
        }
        return result;
    }
}
class Analizer {
    constructor(_lim) {
        this._lim = _lim;
        this._hasWinner = false;
        this._winnerState = new DefaultState();
        this._movesMap = new Map();
        this._keyGenerators = this.GetKeyGenerators();
        let leftDiagonalAnlisysHelper = new DiagonalAnlisysHelper((move, lim) => {
            return lim - (move.rowIndex - move.columnIndex) === lim;
        }, this._lim);
        let rightDiagonalAnlisysHelper = new DiagonalAnlisysHelper((move, lim) => {
            return (1 + move.rowIndex + move.columnIndex) === lim;
        }, this._lim);
        this._movesMap.set("left diagonal", leftDiagonalAnlisysHelper);
        this._movesMap.set("right diagonal", rightDiagonalAnlisysHelper);
    }
    GetKeyGenerators() {
        let keyGenerators = new Array();
        keyGenerators.push((move) => { return `row ${move.rowIndex}`; });
        keyGenerators.push((move) => { return `column ${move.columnIndex}`; });
        keyGenerators.push((move) => { return "left diagonal"; });
        keyGenerators.push((move) => { return "right diagonal"; });
        return keyGenerators;
    }
    updateAnalizer(lastMove) {
        for (const getKey of this._keyGenerators) {
            if (this.hasWinner === true) {
                break;
            }
            let key = getKey(lastMove);
            this.checkByKey(lastMove, key);
        }
    }
    checkByKey(lastMove, key) {
        if (this._movesMap.has(key)) {
            let state = this._movesMap.get(key);
            if (state === undefined)
                return;
            this._winnerState = state.updateState(lastMove);
        }
        else {
            let state = new AnlisysHelperBase(this._lim);
            state.updateState(lastMove);
            this._movesMap.set(key, state);
        }
    }
    get hasWinner() {
        return this._winnerState.isWinner;
    }
    get winnerState() {
        return this._winnerState;
    }
}
exports.Analizer = Analizer;
class DefaultState {
    constructor() {
        this._moves = new Array();
    }
    get moves() {
        return this._moves;
    }
    get isWinner() {
        return false;
    }
}


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Logger {
    log(msg) {
        console.log(msg);
    }
}
exports.Logger = Logger;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Player {
    constructor(name, token) {
        this.name = name;
        this.token = token;
    }
}
exports.Player = Player;


/***/ })
/******/ ]);