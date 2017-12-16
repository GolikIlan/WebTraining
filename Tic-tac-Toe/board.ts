import { BoardInterface, MoveInterface, SummaryInterface, LoggerInterface } from "./common";

export class Board implements BoardInterface
{
    private _defaultToken:string;
    private _board:Array<Array<string>>;
    private _movesCount:number;

    constructor(private _rows:number, private _cols:number, private _logger: LoggerInterface){
        this._defaultToken = "-";
        this._board = new Array<Array<string>>();
        this.initBoard();
        this._movesCount = 0;
    }

    private initBoard(){
        for (let i = 0; i < this._rows; i++) {
            let colsArray = new Array<string>();
            for (let j = 0; j < this._cols; j++) {
                colsArray.push(this._defaultToken);
            } 
            this._board.push(colsArray);         
        }
    }

    print(): void {
        for (let i = 0; i < this._rows; i++) {
            let colsArray = this._board[i];
            let  colsOutput = ""
            for (let j = 0; j < this._cols; j++) {
                colsOutput += ` ${colsArray[j]} `;
            } 
            this._logger.log(colsOutput);
        }
    }

    get availableMoves():number{
        return (this._rows * this._cols) - this._movesCount;
    }

    nextMove(move: MoveInterface): boolean {
        let colsArray = this._board[move.rowIndex]
        let result = false;
        if(colsArray[move.columnIndex] === this._defaultToken)
        {
            colsArray[move.columnIndex] = move.token;
            this._movesCount ++;
            result = true;
        }
        return result;
    }
   
}


