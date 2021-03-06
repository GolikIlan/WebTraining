import { PlayerInterface, BoardInterface, GameInterface, MoveInterface, BoardDisplayInterface, GameStatus, LoggerInterface, AnalizerInterface } from "./common";
import { Board } from "./board";
import { Player } from "./player";
import { Analizer } from "./analizer";
import { Logger } from "./logger";

export class Game implements GameInterface{
    private _board: BoardInterface;
    private _players:Map<string, PlayerInterface>;
    private _totalMovesCount:number;
    private _analizer:AnalizerInterface;
    private _history:Array<MoveInterface>;
    private _logger:LoggerInterface

    constructor(private _rows:number, private _cols:number)
    {
        this._logger = new Logger();
        this.init();
    }

    private init():void{
        if(this._cols === this._rows)
        {
            this._totalMovesCount = 0;
            this._history = new Array();
            this._board = new Board(this._rows, this._cols, this._logger);
            this._players = new Map();
            this._analizer = new Analizer(this._rows);
        }
        else{
            throw new Error("Fatal error the number of rows should be equals to the number of columns.");
        }
    }

    get currentPlayer(): PlayerInterface
    {
        let currentPlayerIndex = this._totalMovesCount % 2;
        let currentPlayerToken = Array.from(this._players.keys())[currentPlayerIndex];
        let player = this._players.get(currentPlayerToken)
        if(player === undefined)
        {
            return {name:"",
                    token:"", 
                    score:0, 
                    incrementScore:() => {}}
        }
        return player;
    }

    get board() : BoardDisplayInterface{
        return this._board;   
    }

    get status():string{
        return this._analizer.winnerState.isWinner === false? this._board.availableMoves == 0 ? GameStatus[GameStatus.Draw] : GameStatus[GameStatus.InProgress] : GameStatus[GameStatus.Completed];
    }

    addPlayer(player: PlayerInterface): void {
        try {
            if(this._players.size == 2) 
            {
                throw new Error("No more than two players can play the game.");
            }
            this._players.set(player.token, player)
        } catch (error) {
            this._logger.log(error)
        }
    }

    nextMove(rowIndex: number, colIndex: number): boolean {
        let result = false;
        try {
            if(this._players.size < 2) {
                throw new Error("there must be two player to play the game");
            }
            if(this._analizer.hasWinner == false)
            {
                let currentPlayerIndex = this._totalMovesCount % 2;
                let currentPlayerToken = Array.from(this._players.keys())[currentPlayerIndex];
                result = this.performMove(new MoveImpl(rowIndex, colIndex, currentPlayerToken));
            }
        } catch (error) {
            this._logger.log(`next move action failed ${error}`);
        }
        return result;
    }

    performMove(move:MoveInterface): boolean {
        let result = this._board.nextMove(move);
        if(result === true)
        {
            this._totalMovesCount ++;
            this._analizer.updateAnalizer(move);
            this._history.push(move);
        }
        return result;
    }

    private getHistory(): string {
        let result:string = "";
        if(this._history.length === 0)
        {
            result = "still no history of moves"
        }
        for (let index = 0; index < this._history.length; index++) {
            const element = this._history[index];
            result += `token ${element.token} to [${element.rowIndex},${element.columnIndex}] \n`;
        }
        return result;
    }

    private getWinner(): string {

        let token = this._analizer.winnerState.moves[0].token;
        if(token === undefined) throw Error("fatal error winner state has wrong token")
        let player = this._players.get(token);
        if(player === undefined) throw Error("fatal error no player with that token")
        player.incrementScore();
        return `${player.name} won! \n`;
    }
    
    get summary(): string {
        let final:string = "";
        let result:string = "";
        let lines = this.getHistory();
        if(this._analizer.winnerState.isWinner === false && this._board.availableMoves > 0){
            result = "Game is in progress \n";
        }
        else if(this._analizer.winnerState.isWinner === false && this._board.availableMoves == 0){
            result = "The game ended in a draw \n";
        }
        else  if(this._analizer.winnerState.isWinner === true){
            result = this.getWinner();
        }
        final = result + lines;
        return final;
    }

    printSummary(): void {
        this._logger.log(this.summary);;
    }
    
}

class MoveImpl implements MoveInterface{
    
    constructor(private _rowIndex:number, private _columnIndex: number, private _token: string)
    {

    }

    get token() : string{
        return this._token;
    }

    get columnIndex() : number{
        return this._columnIndex
    }

    get rowIndex() : number{
        return this._rowIndex
    }
}


