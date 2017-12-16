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
//# sourceMappingURL=analizer.js.map