import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import {IItem, IPriority} from './Interfaces';
import {ItemService} from './Services/ItemService';
import {LoggerService} from '../Shared/Services/LoggerService';

@Component({
    templateUrl: 'editItem.component.html'
})
export class EditItemComponent implements OnInit, OnDestroy {

    editedItem: IItem;
    priorities: IPriority[];
    id: number;
    //get diagnostic() { return JSON.stringify(this.id); }
    editedItemString: string;

    constructor(private _itemService: ItemService,
        private _router: Router,
        private _route: ActivatedRoute,
        private _logger: LoggerService) {
        this._logger.log("constructing EditItemComponent...");
    }

    ngOnInit() {
        this._logger.log("In ngOnInit of EditItemComponent.");
        this.editedItem = this.getEmptyItem();
        if (!this.priorities) {
            this._itemService.getPriorities()
                .subscribe(
                data => this.priorities = data,
                error => this._logger.log(error));
        }

        this.id = +this._route.snapshot.params['id'];
        if (this.id) {
            this._logger.log("Id from route: " + this.id);
            this._itemService.getItemById(this.id).toPromise().then(data => this.editedItem = data);
        }
    }

    getEmptyItem(): IItem {
        return { Id: 0, Description: "", PriorityId: 0, PriorityLevel: "", Class: "", DueBy: null, Status: 0, CompletedOn: null, SubItems: null };
    }

    ngOnDestroy() {
        this._logger.log("Destroying EditItemComponent.");
    }

    onSubmit(): void {
        this._itemService.updateItem(this.editedItem.Id, this.editedItem)
            .subscribe(
            data => {
                this.gotoTodo();
            },
            error => this._logger.log(error));
    }

    gotoTodo() {
        this._router.navigate(['/todo']);
    }

    getEditedItem(): void {
        this.editedItemString = JSON.stringify(this.editedItem);
    }
}