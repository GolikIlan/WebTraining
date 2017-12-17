"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("./common");
const game_1 = require("./game");
const player_1 = require("./player");
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
//# sourceMappingURL=tic_tac_toe_view_manager.js.map