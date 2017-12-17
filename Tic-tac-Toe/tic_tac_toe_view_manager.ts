import { GameInterface, GameStatus, PlayerInterface } from "./common";
import { Game } from "./game";
import { Player } from "./player";


export class GameViewManager{

    _oPlayer: PlayerInterface;
    private _xPlayer: PlayerInterface;
    private _sectionSize: number;
    private _canvasSize: number;
    private _game:GameInterface;
    private _context:any;
    private _lineColor:any;

    constructor(private _canvas:any, private _colsAndRows:number, private _whenHasWinner:any, private _resetButton:any, private _scorePresenter:any) {
        this._lineColor = "#ddd";
        this.initBoard(new Player('John Doe', 'x'), new Player('Jason Bourne', 'o'));
        this.initCanvas();

        this._canvas.addEventListener('mouseup', (event:any)=>{
            let canvasMousePosition = this.getCanvasMousePosition(event);
            let cordinates = this.getCordinates(canvasMousePosition);
            this.play(cordinates);
        });

        this._resetButton.addEventListener('mouseup', () => {
            this.startNewGame();
        })
    }

    private startNewGame(): any {
        if(this._xPlayer === undefined || this._oPlayer === undefined)
        {
            throw new Error("there have to be two players to play the game.")
        }
        this.initBoard(this._xPlayer, this._oPlayer);
        this.clearCanvas();
        this.drawLines(10, this._lineColor);
    }

    clearCanvas(): any {
        this._context.clearRect(0, 0, this._canvasSize, this._canvasSize);
    }

    public nextMove(row:number, column:number)
    {
        let lim = this._colsAndRows - 1;
        if(row > lim || column > lim)
        {
            throw new Error("coordinate should not be greater than the board dimensions");
        }
        let xCordinate = column * this._sectionSize;
        let yCordinate = row * this._sectionSize;

        let currentInput =  {
            x: row,
            y: column,
            xCordinateOnCanvas:xCordinate,
            yCordinateOnCanvas:yCordinate,
          }
        this.play(currentInput);
    }

    public initBoard(xPlayer:PlayerInterface, oPlayer:PlayerInterface): any {
        this._game = new Game(this._colsAndRows, this._colsAndRows);
        this._xPlayer = xPlayer;
        this._oPlayer = oPlayer;
        this._game.addPlayer(this._xPlayer );
        this._game.addPlayer(this._oPlayer);
        this.updateScorePresenter();
    }

    public alertSummary()
    {
        var summary = this._game.summary;
        alert(summary);
    }


    private play(gameInput: any): any {
        let currentPlayer = this._game.currentPlayer
        let result = this._game.nextMove(gameInput.x, gameInput.y);
        if(result === true && currentPlayer.token !== "")
        {
           this.drawOnCanvas(gameInput, currentPlayer.token);  
           this.checkGameStatus(this._game.status)  
           this.drawLines(10, this._lineColor);         
        }
    }

    private checkGameStatus(gameStatus: string): any {
        if(gameStatus !== GameStatus[GameStatus.InProgress])
        {
            let summaryMsg = this._game.summary;
            this._whenHasWinner(summaryMsg);
            this.updateScorePresenter();
        }
    }

    updateScorePresenter(): any {
        this._scorePresenter.innerHTML = `${this._xPlayer.token} ${this._xPlayer.score} : ${this._oPlayer.score} ${this._oPlayer.token}`
    }

    private drawOnCanvas(gameInput: any, token: string) {
        this.clearPlayingArea(gameInput.xCordinateOnCanvas, gameInput.yCordinateOnCanvas)
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

    private drawO(xCordinate:number, yCordinate:number) {
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
      
    private drawX(xCordinate:number, yCordinate:number) {
        this._context.strokeStyle = "#f1be32";
      
        this._context.beginPath();
        
        let offset = (this._sectionSize * 0.301204819);
        this._context.moveTo(xCordinate + offset, yCordinate + offset);
        this._context.lineTo(xCordinate + this._sectionSize - offset, yCordinate + this._sectionSize - offset);
      
        this._context.moveTo(xCordinate + offset, yCordinate + this._sectionSize - offset);
        this._context.lineTo(xCordinate + this._sectionSize - offset, yCordinate + offset);
        this._context.stroke();
      }

    private clearPlayingArea (xCordinate:number, yCordinate:number) {
        this._context.fillStyle = "#fff";
        this._context.fillRect(
          xCordinate,
          yCordinate,
          this._sectionSize,
          this._sectionSize
        ); 
      }

    private getCordinates(moseXandYPosition: any): any {
        let xCordinate;
        let yCordinate;
      
        for (let x = 0;x < this._colsAndRows;x++) {
          for (let y = 0;y < this._colsAndRows;y++) {
            xCordinate = x * this._sectionSize;
            yCordinate = y * this._sectionSize;
      
            if (
                moseXandYPosition.x >= xCordinate && moseXandYPosition.x <= xCordinate + this._sectionSize &&
                moseXandYPosition.y >= yCordinate && moseXandYPosition.y <= yCordinate + this._sectionSize
              ) {
              return {
                x: x,
                y: y,
                xCordinateOnCanvas:xCordinate,
                yCordinateOnCanvas:yCordinate,
              }
            }
          }
        }
        throw new Error(`fatal error mouse positions [${moseXandYPosition.x}, ${moseXandYPosition.y}] are not on canvas`);
    }

    private initCanvas(){
        this._context = this._canvas.getContext('2d');
        
        this._canvasSize = 500;
        this._sectionSize = this._canvasSize / this._colsAndRows;
        this._canvas.width = this._canvasSize;
        this._canvas.height = this._canvasSize;
        this._context.translate(0.5, 0.5);
        this.drawLines(10, this._lineColor);
    }

    private drawLines (lineWidth:any, strokeStyle:any) {
        let lineStart = 4;
        let lineLenght = this._canvasSize - 5;
        this._context.lineWidth = lineWidth;
        this._context.lineCap = 'round';
        this._context.strokeStyle = strokeStyle;
        this._context.beginPath();
      
        /*
         * Horizontal lines 
         */
        for (let y = 1;y <= this._colsAndRows - 1;y++) {  
          this._context.moveTo(lineStart, y * this._sectionSize);
          this._context.lineTo(lineLenght, y * this._sectionSize);
        }
      
        /*
         * Vertical lines 
         */
        for (let x = 1;x <= this._colsAndRows - 1;x++) {
          this._context.moveTo(x * this._sectionSize, lineStart);
          this._context.lineTo(x * this._sectionSize, lineLenght);
        }
      
        this._context.stroke();
      }

      private getCanvasMousePosition (event:any) {
        let rect = this._canvas.getBoundingClientRect();
      
        return {
          x: event.clientX - rect.left,
          y: event.clientY - rect.top
        }
      }
}