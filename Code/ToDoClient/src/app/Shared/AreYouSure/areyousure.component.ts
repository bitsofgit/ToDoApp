import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    //moduleId: module.id,
    selector: '<app-areyousure>',
    templateUrl: 'areyousure.component.html'
})
export class AreYouSureComponent implements OnInit {
    constructor() { }

    ngOnInit() { }

    @Input() que: string;
    @Output() notifyYes: EventEmitter<string> = new EventEmitter<string>();
    @Output() notifyNo: EventEmitter<string> = new EventEmitter<string>()

    Yes() {
        this.notifyYes.emit("");
    }

    No() {
        this.notifyNo.emit("");
    }
}