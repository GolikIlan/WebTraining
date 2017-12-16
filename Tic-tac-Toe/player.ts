import { PlayerInterface } from "./common";

export class Player implements PlayerInterface{
    constructor(public name:string, public token:string){        
    }
}