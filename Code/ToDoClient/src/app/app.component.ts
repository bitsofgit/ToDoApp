import { Component } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: 'app.component.html'
    
})
export class AppComponent { 
    title: string = 'Big App';
    name: string = 'Akhil';

    onClick(){
        this.title = new Date().toTimeString();
    } 
}
