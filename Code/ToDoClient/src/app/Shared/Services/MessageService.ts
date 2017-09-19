import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class MessageService {
    private subject = new Subject<any>();
    
       sendMessage(message: string): void {
           console.log("In Message service - sendMessage: " + message);
           this.subject.next({ text: message });
       }
    
       clearMessage(): void {
           this.subject.next();
       }
    
       getMessage(): Observable<any> {
           console.log("In Message service - getMessage");
           return this.subject.asObservable();
       }   
}