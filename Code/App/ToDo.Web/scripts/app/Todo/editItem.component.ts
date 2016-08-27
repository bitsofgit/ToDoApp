import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import {IItem, IPriority} from './Interfaces';
import {ItemService} from './ItemService';

@Component({
    //moduleId: module.id,
    selector: 'app-editItem',
    templateUrl: './app/Todo/editItem.component.html'
})
export class EditItemComponent implements OnInit {
    @Input() editedItem: IItem;
    @Output() notifyDone: EventEmitter<IItem> = new EventEmitter<IItem>();
    @Output() notifyCancel: EventEmitter<string> = new EventEmitter<string>();

    priorities: IPriority[];

    constructor(private _itemService: ItemService) { }

    ngOnInit() {
        //this.priorities = this._itemService.getCachedPriorities();
        if (!this.priorities) {
            this._itemService.getPriorities()
                .subscribe(
                    data => this.priorities = data,
                    error => console.log(error));
        }
    }

    onSubmit(): void {
        this._itemService.updateItem(this.editedItem.Id, this.editedItem)
            .subscribe(
            data => { this.notifyDone.emit(data); },
            error => console.log(error));
    }

    Cancel(): void {
        this.notifyCancel.emit("");
    }
}