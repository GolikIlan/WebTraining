import { MoveInterface, AnalizerStateInterface, AnalizerInterface } from "./common";

interface AnalizerStateManagerInterface extends AnalizerStateInterface{
    updateState(move:MoveInterface):AnalizerStateInterface;
}


class AnlisysHelperBase extends Array<MoveInterface>  implements AnalizerStateManagerInterface{
    private _isWinner:boolean;
    private _shouldCheckState:boolean;

    constructor(protected _lim:number) {
        super();
        this._isWinner = false;
        this._shouldCheckState = true;
    }

    updateState(move: MoveInterface): AnalizerStateInterface {
        let result:AnalizerStateInterface = new DefaultState();
        if(this.length === 0)
        {
            this.addMove(move);
        }
        else if(this._shouldCheckState === true && this.isWinner === false)
        {
            let token = move.token;
            var lastUpdate = this[this.length - 1];
            let isASequenceOfSameToken = (lastUpdate.token === token);
            let canAddAdditionalToken = this.addMove(move);
            this._isWinner = canAddAdditionalToken === false && isASequenceOfSameToken === true;
            this._shouldCheckState = isASequenceOfSameToken;
            if(this._isWinner)
            {
                result = this
            }
        }
        return result;
    }

    private addMove(move:MoveInterface):boolean
    {
        this.push(move);
        return this.length < this._lim;
    }

    get isWinner(): boolean{
        return this._isWinner;
    }
    get moves(): MoveInterface[]{
        return this;
    }

}

class DiagonalAnlisysHelper extends AnlisysHelperBase{

    constructor(private diagonalMatchingRule:any, lim:number) {
        super(lim);
    }

    updateState(move: MoveInterface): AnalizerStateInterface {
        let result:AnalizerStateInterface = new DefaultState();
        if(this.diagonalMatchingRule(move, this._lim) === true)
        {
            return super.updateState(move);
        }
        return result;
    }
    
}

export class Analizer implements AnalizerInterface{

    private _movesMap:Map<string, AnalizerStateManagerInterface>;
    private _keyGenerators : Array<any>;
    private _hasWinner:boolean;
    private _winnerState:AnalizerStateInterface

    constructor(private _lim:number)
    {
        this._hasWinner = false;
        this._winnerState = new DefaultState();
        this._movesMap = new Map<string, AnlisysHelperBase>();

        this._keyGenerators = this.GetKeyGenerators()

        let leftDiagonalAnlisysHelper:AnalizerStateManagerInterface = new DiagonalAnlisysHelper((move: MoveInterface, lim:number) => {
            return lim - (move.rowIndex - move.columnIndex) === lim;
        }, this._lim);

        let rightDiagonalAnlisysHelper:AnalizerStateManagerInterface = new DiagonalAnlisysHelper((move: MoveInterface, lim:number) => {
            return (1 + move.rowIndex + move.columnIndex) === lim;
        }, this._lim);

        this._movesMap.set("left diagonal", leftDiagonalAnlisysHelper)
        this._movesMap.set("right diagonal", rightDiagonalAnlisysHelper)
    }

    GetKeyGenerators(): any {
        let keyGenerators = new Array<any>();
        keyGenerators.push((move:MoveInterface) => {return `row ${move.rowIndex}`; });
        keyGenerators.push((move:MoveInterface) => {return `column ${move.columnIndex}`; });
        keyGenerators.push((move:MoveInterface) => {return "left diagonal"; });
        keyGenerators.push((move:MoveInterface) => {return "right diagonal"; });
        return keyGenerators;
    }

    updateAnalizer(lastMove:MoveInterface):void
    {
        for (const getKey of this._keyGenerators) {
            if(this.hasWinner === true)
            {
                break;
            }
            let key = getKey(lastMove);
            this.checkByKey(lastMove, key);
        }
    }

    private checkByKey(lastMove:MoveInterface, key:string)
    {
        if(this._movesMap.has(key))
        {
            let state = this._movesMap.get(key);
            if(state === undefined) return;
            this._winnerState = state.updateState(lastMove);
        }
        else{
            let state = new AnlisysHelperBase(this._lim);
            state.updateState(lastMove)
            this._movesMap.set(key, state);
        }
    }

    get hasWinner():boolean
    {
        return this._winnerState.isWinner;
    }

    get winnerState():AnalizerStateInterface
    {
        return this._winnerState;
    }
}

class DefaultState implements AnalizerStateInterface{

    private _moves:Array<MoveInterface>;
    constructor()
    {
        this._moves = new Array<MoveInterface>();
    }

    get moves():Array<MoveInterface>{
        return this._moves;
    }

    get isWinner():boolean{
        return false;
    }
}