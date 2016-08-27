import { Component, OnInit, OnDestroy, OnChanges } from '@angular/core';

import {IItem, ISubItem, IPriority} from './Interfaces';
import {ItemService} from './ItemService';

@Component({
    // moduleId: module.id,
    selector: 'app-todo',
    templateUrl: './app/Todo/todo.component.html'
})
export class TodoComponent implements OnInit, OnDestroy, OnChanges {
    pageTitle: "To Do List";
    items: IItem[] = [];
    itemToBeDeleted: number;
    itemToBeEdited: number;
    showDetailsForId: number;
    priorities: IPriority[];
    get diagnostic() { return JSON.stringify(this.priorities); }

    constructor(private _itemService: ItemService) { }

    // Application Hooks 
    ngOnInit() {
        this.InitializeItems();
        
    }

    ngOnDestroy(): void {
        console.log("In OnDestroy");
    }

    ngOnChanges(): void {
        console.log("In OnChanges");
    }
    // Application Hooks

    getPriorityLevelById(id: number): string {
        let level = null;
        if (this.priorities) {
            for (let i = 0; i < this.priorities.length; i++) {
                if (this.priorities[i].Id === id) {
                    level = this.priorities[i].PriorityLevel;
                    break;
                } 
            }
        }
        return level;
    }

    private updatePriorities() {
        for (let i = 0; i < this.items.length; i++) {
            this.items[i].PriorityLevel = this.getPriorityLevelById(this.items[i].PriorityId);
        }
    }

    private InitializeItems(): void {
        this._itemService.getItems()
            .subscribe(
            data => {
                this.items = data;
                if (this.priorities) {
                    this.updatePriorities();
                } else {
                    this._itemService.getPriorities()
                        .subscribe(
                            dt => {
                                this.priorities = dt;
                                this.updatePriorities();
                            },
                            error => console.log(error));
                }
            },
            error => console.log(error));
    }

    getItemById(id: number): IItem {
        let item: IItem;
        for (let i = 0; i < this.items.length; i++) {
            if (this.items[i].Id === id) {
                item = this.items[i];
                break;
            }
        }
        return item;
    }

    MoveToInProgress(id: number): void {
        let item: IItem = this.getItemById(id);
        item.Status = 2;
        this.UpdateItem(id, item);
    }

    MoveBackToDo(id: number): void {
        let item: IItem = this.getItemById(id);
        item.Status = 1;
        this.UpdateItem(id, item);
    }

    private UpdateItem(id, item: IItem) {
        this._itemService.updateItem(id, item)
            .subscribe(
            data => { this.InitializeItems(); },
            error => console.log(error));
    }

    MarkAsDone(id: number): void {
        let item: IItem = this.getItemById(id);
        item.Status = 3;
        item.CompletedOn = new Date();
        this.UpdateItem(id, item);
    }

    Delete(id: number): void {
        //ToDo: validation

        //ToDo: Show Confirm Popup

        this._itemService.deleteItem(id)
            .subscribe(
            data => this.InitializeItems(),
            error => console.log(error)
            );
        console.log("Item " + id + " deleted successfully");
        this.itemToBeDeleted = null;

        //for (var i = 0; i < this.items.length; i++) {
        //    if (this.items[i].Id == id) {
        //        this.items.splice(i, 1);
        //        break;
        //    }
        //}
    }

    //DeleteSubItem(itemId: number, subItemId: number): void {
    //    //ToDo: validation

    //    //ToDo: Show Confirm Popup

    //    //ToDo: call service to delete

    //    for (var i = 0; i < this.items.length; i++) {
    //        if (this.items[i].Id == itemId) {
    //            let item = this.items[i];
    //            for (var j = 0; j < item.SubItems.length; j++) {
    //                if (item.SubItems[j].Id == subItemId) {
    //                    item.SubItems.splice(j, 1);
    //                    break;
    //                }
    //            }
    //        }
    //    }
    //}

    OnNotifyAdd(item: IItem): void {
        this.InitializeItems();
    }

    RequestForDelete(id: number): void {
        this.itemToBeDeleted = id;
    }

    CancelDelete(): void {
        this.itemToBeDeleted = null;
    }

    RequestForEdit(id: number): void {
        if (this.itemToBeEdited == id) {
            this.itemToBeEdited = null;
            return;
        }

        this.itemToBeEdited = id;
    }

    OnNotifyEditDone(item: IItem): void {
        this.itemToBeEdited = null;
        this.InitializeItems();
    }

    OnNotifyEditCancel(): void {
        this.itemToBeEdited = null;
    }

    OnNotifyDeleteSubItem(message: string): void {
        this.InitializeItems();
    }

    OnNotifyAddSubItem(subItem: ISubItem): void {
        this.InitializeItems();
    }

    showDetails(id: number): void {
        if (this.showDetailsForId == id) {
            this.showDetailsForId = null;
            return;
        }

        this.showDetailsForId = id;
    }
}