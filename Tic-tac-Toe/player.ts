import { PlayerInterface } from "./common";

export class Player implements PlayerInterface{
    private _score: number;

    constructor(public name:string, public token:string){  
        this._score = 0;      
    }

    incrementScore(): void {
         this._score ++;
    }

    get score(): number
    {
        return this._score;
    }
}