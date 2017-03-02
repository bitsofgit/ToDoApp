import { Component, OnInit, Input } from '@angular/core';

@Component({
   // moduleId: module.id,
    selector: 'app-overdue',
    templateUrl: 'overdue.component.html'
})
export class OverdueComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        if (this.DueBy) {
            let d: Date = new Date(this.DueBy.toString());
            this.IsOverDue = new Date() > d;
        } else {
            this.IsOverDue = false;
        }
        
    }

    @Input() DueBy: Date;
    IsOverDue: boolean;
}
