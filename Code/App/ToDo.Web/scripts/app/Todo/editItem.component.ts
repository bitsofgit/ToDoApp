import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import {IItem, IPriority} from './Interfaces';
import {ItemService} from './Services/ItemService';

@Component({
    //moduleId: module.id,
    //selector: 'app-editItem',
    templateUrl: './app/Todo/editItem.component.html'
})
export class EditItemComponent implements OnInit, OnDestroy {
    //@Input() editedItem: IItem;
    //@Output() notifyDone: EventEmitter<IItem> = new EventEmitter<IItem>();
    //@Output() notifyCancel: EventEmitter<string> = new EventEmitter<string>();

    editedItem: IItem;
    priorities: IPriority[];
    //sub: Subscription;
    id: number;
    //get diagnostic() { return JSON.stringify(this.id); }
    editedItemString: string;

    constructor(private _itemService: ItemService,
        private _router: Router,
        private _route: ActivatedRoute) {
        console.log("constructing EditItemComponent...");
    }

    ngOnInit() {
        console.log("In ngOnInit of EditItemComponent.");
        this.editedItem = this.getEmptyItem();
        //this.priorities = this._itemService.getCachedPriorities();
        if (!this.priorities) {
            this._itemService.getPriorities()
                .subscribe(
                data => this.priorities = data,
                error => console.log(error));
        }

        //this.sub = this._route.params.subscribe(params => {
        //    this.id = +params['id']; // (+) converts string 'id' to a number
        //    this._itemService.getItemById(this.id)
        //        .subscribe(
        //            data => {
        //                this.editedItem = data;
        //                console.log(data);
        //            },
        //            error => console.log(error)
        //        );
        //});

        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            console.log("Id from route: " + this.id);
            this._itemService.getItemById(this.id).toPromise().then(data => this.editedItem = data);
        }
    }

    getEmptyItem(): IItem {
        return { Id: 0, Description: "", PriorityId: 0, PriorityLevel: "", Class: "", DueBy: null, Status: 0, CompletedOn: null, SubItems: null };
    }

    ngOnDestroy() {
        console.log("Destroying EditItemComponent.");
        //this.sub.unsubscribe();
    }

    onSubmit(): void {
        this._itemService.updateItem(this.editedItem.Id, this.editedItem)
            .subscribe(
            data => {
                //this.notifyDone.emit(data);
                this.gotoTodo();
            },
            error => console.log(error));
    }

    gotoTodo() {
        this._router.navigate(['/todo']);
    }

    getEditedItem(): void {
        this.editedItemString = JSON.stringify(this.editedItem);
    }
}