export  interface PlayerInterface{
    name:string;
    token:string;
}

export interface GameInterface{
    board:BoardDisplayInterface;
    status:string;
    addPlayer(player:PlayerInterface):void;
    nextMove(rowIndex:number, colIndex:number):boolean;
    printSummary():void;
}

export interface AnalizerStateInterface{
    isWinner:boolean;
    moves:Array<MoveInterface>;
}
export interface AnalizerInterface{
    
        updateAnalizer(lastMove:MoveInterface):void;
        winnerState:AnalizerStateInterface;
        hasWinner:boolean;
}

export interface LoggerInterface{
    log(msg:string):void;
}

export interface BoardDisplayInterface{
    print():void;
}

export interface BoardInterface extends BoardDisplayInterface{
    nextMove(move:MoveInterface):boolean;
    availableMoves:number;
}

export interface MoveInterface{
    rowIndex:number;
    columnIndex:number;
    token:string;
}

export interface SummaryInterface{
    moves:Array<MoveInterface>;
    status:GameStatus;
}


export enum GameStatus{
    InProgress,
    Draw,
    Completed,
}
