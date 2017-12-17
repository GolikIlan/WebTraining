import { Game } from "./game";
import { Player } from "./player";
import * as styles from './src/site.css'
import { GameViewManager } from "./tic_tac_toe_view_manager";

let game = new Game(3,3);

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
resOfMove = game.nextMove(0, 1); 
resOfMove = game.nextMove(2, 1); 

game.board.print(); 

game.printSummary();

let canvas:any = document.getElementById('tic-tac-toe-board');
let resetButton:any = document.getElementsByClassName('resetButton')[0];
let scorePresenter:any = document.getElementsByClassName('scoreDiv')[0];
let manager = new GameViewManager(canvas, 3, (msg:string) => { alert(msg);}, resetButton, scorePresenter);

manager.initBoard(new Player('John Doe', 'x'), new Player('Jason Bourne', 'o'))
manager.nextMove(0, 0); 
manager.nextMove(0, 0); 
manager.nextMove(1, 1); 
manager.nextMove(0, 2); 
manager.nextMove(2, 2); 
manager.nextMove(0, 1); 
manager.nextMove(2, 1);