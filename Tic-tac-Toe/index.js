"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const game_1 = require("./game");
const player_1 = require("./player");
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
//# sourceMappingURL=index.js.map