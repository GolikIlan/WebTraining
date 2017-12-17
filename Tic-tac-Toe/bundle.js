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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const board_1 = __webpack_require__(4);
const analizer_1 = __webpack_require__(5);
const logger_1 = __webpack_require__(6);
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
    get currentPlayer() {
        let currentPlayerIndex = this._totalMovesCount % 2;
        let currentPlayerToken = Array.from(this._players.keys())[currentPlayerIndex];
        let player = this._players.get(currentPlayerToken);
        if (player === undefined) {
            return { name: "",
                token: "",
                score: 0,
                incrementScore: () => { } };
        }
        return player;
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
    getHistory() {
        let result = "";
        if (this._history.length === 0) {
            result = "still no history of moves";
        }
        for (let index = 0; index < this._history.length; index++) {
            const element = this._history[index];
            result += `token ${element.token} to [${element.rowIndex},${element.columnIndex}] \n`;
        }
        return result;
    }
    getWinner() {
        let token = this._analizer.winnerState.moves[0].token;
        if (token === undefined)
            throw Error("fatal error winner state has wrong token");
        let player = this._players.get(token);
        if (player === undefined)
            throw Error("fatal error no player with that token");
        player.incrementScore();
        return `${player.name} won! \n`;
    }
    get summary() {
        let final = "";
        let result = "";
        let lines = this.getHistory();
        if (this._analizer.winnerState.isWinner === false && this._board.availableMoves > 0) {
            result = "Game is in progress \n";
        }
        else if (this._analizer.winnerState.isWinner === false && this._board.availableMoves == 0) {
            result = "The game ended in a draw \n";
        }
        else if (this._analizer.winnerState.isWinner === true) {
            result = this.getWinner();
        }
        final = result + lines;
        return final;
    }
    printSummary() {
        this._logger.log(this.summary);
        ;
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
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

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


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = __webpack_require__(0);
const player_1 = __webpack_require__(2);
const tic_tac_toe_view_manager_1 = __webpack_require__(7);
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
let canvas = document.getElementById('tic-tac-toe-board');
let resetButton = document.getElementsByClassName('resetButton')[0];
let scorePresenter = document.getElementsByClassName('scoreDiv')[0];
let manager = new tic_tac_toe_view_manager_1.GameViewManager(canvas, 3, (msg) => { alert(msg); }, resetButton, scorePresenter);
manager.initBoard(new player_1.Player('John Doe', 'x'), new player_1.Player('Jason Bourne', 'o'));
manager.nextMove(0, 0);
manager.nextMove(0, 0);
manager.nextMove(1, 1);
manager.nextMove(0, 2);
manager.nextMove(2, 2);
manager.nextMove(0, 1);
manager.nextMove(2, 1);


/***/ }),
/* 4 */
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
/* 5 */
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
/* 6 */
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
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = __webpack_require__(1);
const game_1 = __webpack_require__(0);
const player_1 = __webpack_require__(2);
class GameViewManager {
    constructor(_canvas, _colsAndRows, _whenHasWinner, _resetButton, _scorePresenter) {
        this._canvas = _canvas;
        this._colsAndRows = _colsAndRows;
        this._whenHasWinner = _whenHasWinner;
        this._resetButton = _resetButton;
        this._scorePresenter = _scorePresenter;
        this._lineColor = "#ddd";
        this.initBoard(new player_1.Player('John Doe', 'x'), new player_1.Player('Jason Bourne', 'o'));
        this.initCanvas();
        this._canvas.addEventListener('mouseup', (event) => {
            let canvasMousePosition = this.getCanvasMousePosition(event);
            let cordinates = this.getCordinates(canvasMousePosition);
            this.play(cordinates);
        });
        this._resetButton.addEventListener('mouseup', () => {
            this.startNewGame();
        });
    }
    startNewGame() {
        if (this._xPlayer === undefined || this._oPlayer === undefined) {
            throw new Error("there have to be two players to play the game.");
        }
        this.initBoard(this._xPlayer, this._oPlayer);
        this.clearCanvas();
        this.drawLines(10, this._lineColor);
    }
    clearCanvas() {
        this._context.clearRect(0, 0, this._canvasSize, this._canvasSize);
    }
    nextMove(row, column) {
        let lim = this._colsAndRows - 1;
        if (row > lim || column > lim) {
            throw new Error("coordinate should not be greater than the board dimensions");
        }
        let xCordinate = column * this._sectionSize;
        let yCordinate = row * this._sectionSize;
        let currentInput = {
            x: row,
            y: column,
            xCordinateOnCanvas: xCordinate,
            yCordinateOnCanvas: yCordinate,
        };
        this.play(currentInput);
    }
    initBoard(xPlayer, oPlayer) {
        this._game = new game_1.Game(this._colsAndRows, this._colsAndRows);
        this._xPlayer = xPlayer;
        this._oPlayer = oPlayer;
        this._game.addPlayer(this._xPlayer);
        this._game.addPlayer(this._oPlayer);
        this.updateScorePresenter();
    }
    alertSummary() {
        var summary = this._game.summary;
        alert(summary);
    }
    play(gameInput) {
        let currentPlayer = this._game.currentPlayer;
        let result = this._game.nextMove(gameInput.x, gameInput.y);
        if (result === true && currentPlayer.token !== "") {
            this.drawOnCanvas(gameInput, currentPlayer.token);
            this.checkGameStatus(this._game.status);
            this.drawLines(10, this._lineColor);
        }
    }
    checkGameStatus(gameStatus) {
        if (gameStatus !== common_1.GameStatus[common_1.GameStatus.InProgress]) {
            let summaryMsg = this._game.summary;
            this._whenHasWinner(summaryMsg);
            this.updateScorePresenter();
        }
    }
    updateScorePresenter() {
        this._scorePresenter.innerHTML = `${this._xPlayer.token} ${this._xPlayer.score} : ${this._oPlayer.score} ${this._oPlayer.token}`;
    }
    drawOnCanvas(gameInput, token) {
        this.clearPlayingArea(gameInput.xCordinateOnCanvas, gameInput.yCordinateOnCanvas);
        switch (token) {
            case "x":
                {
                    this.drawX(gameInput.xCordinateOnCanvas, gameInput.yCordinateOnCanvas);
                }
                break;
            case "o":
                {
                    this.drawO(gameInput.xCordinateOnCanvas, gameInput.yCordinateOnCanvas);
                }
                break;
            default:
                break;
        }
    }
    drawO(xCordinate, yCordinate) {
        let halfSectionSize = (0.5 * this._sectionSize);
        let centerX = xCordinate + halfSectionSize;
        let centerY = yCordinate + halfSectionSize;
        let dia = this._sectionSize * 0.397590361;
        let radius = (dia) * 0.5;
        let startAngle = 0 * Math.PI;
        let endAngle = 2 * Math.PI;
        this._context.lineWidth = 10;
        this._context.strokeStyle = "#01bBC2";
        this._context.beginPath();
        this._context.arc(centerX, centerY, radius, startAngle, endAngle);
        this._context.stroke();
    }
    drawX(xCordinate, yCordinate) {
        this._context.strokeStyle = "#f1be32";
        this._context.beginPath();
        let offset = (this._sectionSize * 0.301204819);
        this._context.moveTo(xCordinate + offset, yCordinate + offset);
        this._context.lineTo(xCordinate + this._sectionSize - offset, yCordinate + this._sectionSize - offset);
        this._context.moveTo(xCordinate + offset, yCordinate + this._sectionSize - offset);
        this._context.lineTo(xCordinate + this._sectionSize - offset, yCordinate + offset);
        this._context.stroke();
    }
    clearPlayingArea(xCordinate, yCordinate) {
        this._context.fillStyle = "#fff";
        this._context.fillRect(xCordinate, yCordinate, this._sectionSize, this._sectionSize);
    }
    getCordinates(moseXandYPosition) {
        let xCordinate;
        let yCordinate;
        for (let x = 0; x < this._colsAndRows; x++) {
            for (let y = 0; y < this._colsAndRows; y++) {
                xCordinate = x * this._sectionSize;
                yCordinate = y * this._sectionSize;
                if (moseXandYPosition.x >= xCordinate && moseXandYPosition.x <= xCordinate + this._sectionSize &&
                    moseXandYPosition.y >= yCordinate && moseXandYPosition.y <= yCordinate + this._sectionSize) {
                    return {
                        x: x,
                        y: y,
                        xCordinateOnCanvas: xCordinate,
                        yCordinateOnCanvas: yCordinate,
                    };
                }
            }
        }
        throw new Error(`fatal error mouse positions [${moseXandYPosition.x}, ${moseXandYPosition.y}] are not on canvas`);
    }
    initCanvas() {
        this._context = this._canvas.getContext('2d');
        this._canvasSize = 500;
        this._sectionSize = this._canvasSize / this._colsAndRows;
        this._canvas.width = this._canvasSize;
        this._canvas.height = this._canvasSize;
        this._context.translate(0.5, 0.5);
        this.drawLines(10, this._lineColor);
    }
    drawLines(lineWidth, strokeStyle) {
        let lineStart = 4;
        let lineLenght = this._canvasSize - 5;
        this._context.lineWidth = lineWidth;
        this._context.lineCap = 'round';
        this._context.strokeStyle = strokeStyle;
        this._context.beginPath();
        /*
         * Horizontal lines
         */
        for (let y = 1; y <= this._colsAndRows - 1; y++) {
            this._context.moveTo(lineStart, y * this._sectionSize);
            this._context.lineTo(lineLenght, y * this._sectionSize);
        }
        /*
         * Vertical lines
         */
        for (let x = 1; x <= this._colsAndRows - 1; x++) {
            this._context.moveTo(x * this._sectionSize, lineStart);
            this._context.lineTo(x * this._sectionSize, lineLenght);
        }
        this._context.stroke();
    }
    getCanvasMousePosition(event) {
        let rect = this._canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
}
exports.GameViewManager = GameViewManager;


/***/ })
/******/ ]);