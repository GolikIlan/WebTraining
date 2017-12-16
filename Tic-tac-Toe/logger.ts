import { LoggerInterface } from "./common";

export class Logger implements LoggerInterface{
    log(msg: string): void {
        console.log(msg);
    }
}