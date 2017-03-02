import { Injectable } from "@angular/core";

@Injectable()
export class LoggerService {
    logs: string[] = []; 

    constructor() {
        console.log("constructing logger service");
        this.logs.push("constructing logger service");
    }

    log(message: string) {
        this.logs.push(message);
        console.log(message);
    }
}