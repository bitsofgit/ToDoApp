import { Component, OnInit, Input } from '@angular/core';

@Component({
   // moduleId: module.id,
    selector: 'app-overdue',
    templateUrl: './app/Todo/overdue.component.html'
})
export class OverdueComponent implements OnInit {
    constructor() { }

    ngOnInit() {
        let d: Date = new Date(this.DueBy.toString());
        this.IsOverDue = new Date() > d;
    }

    @Input() DueBy: Date;
    IsOverDue: boolean;
}
