import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import {IItem, ISubItem} from './Interfaces';
import {ItemService} from './Services/ItemService';


@Component({
    // moduleId: module.id,
    selector: '<app-subitem>',
    templateUrl: './app/Todo/subItem.component.html'
})
export class SubItemComponent implements OnInit {
    @Input() item: IItem;
    @Output() notifySubItemDelete: EventEmitter<string> = new EventEmitter<string>();
    @Output() notifySubItemAdd: EventEmitter<ISubItem> = new EventEmitter<ISubItem>();
    subItemToBeDeleted: number = null;
    showAddSubItem: boolean = false;
    showAddSubItemId: number;
    subItemDescription: string;
    get diagnostic() { return JSON.stringify(this.item) };

    constructor(private _itemService: ItemService) { }

    ngOnInit() { }

    RequestForDelete(id: number): void {
        this.subItemToBeDeleted = id;
    }

    DeleteSubItem(si: ISubItem): void {
        this._itemService.deleteSubItem(si.Id)
            .subscribe(
            data => {
                this.subItemToBeDeleted = null;
                this.notifySubItemDelete.emit(data);
            },
            error => console.log(error));
    }

    CancelDelete(): void {
        this.subItemToBeDeleted = null;
    }

    AddSubItem(itemId: number): void {
        if (this.subItemDescription) {
            let subItem: ISubItem = { Id: 0, ItemId: itemId, Description: this.subItemDescription };
            this._itemService.addSubItem(subItem)
                .subscribe(
                    data => {
                        this.notifySubItemAdd.emit(subItem);

                        //reset
                        this.subItemDescription = "";
                        this.showAddSubItem = false;
                        this.showAddSubItemId = null;
                    },
                    error => console.log(error));
        } else {
            throw new Error("Description for a subitem is required.");
        }
    }

    showAddSubItemClicked(): void {
        if (this.showAddSubItem) {
            this.showAddSubItem = false;
            this.showAddSubItemId = null;
            return;
        }
        this.showAddSubItem = true;
        this.showAddSubItemId = this.item.Id;
    }
}