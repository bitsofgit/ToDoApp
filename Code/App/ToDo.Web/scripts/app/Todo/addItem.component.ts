import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import {IItem, IPriority} from './Interfaces';
import {ItemService} from './ItemService';

@Component({
    //moduleId: module.id,
    selector: 'app-addItem',
    templateUrl: './app/Todo/additem.component.html'
})
export class AddItemComponent implements OnInit {
    showForm: boolean = false;
    @Output() notifyAdd: EventEmitter<IItem> = new EventEmitter<IItem>();
    addedItem: IItem;
    get diagnostic() { return JSON.stringify(this.addedItem); }
    submitted: boolean = false;
    priorities: IPriority[];

    aForm: FormGroup;

    constructor(private _fb: FormBuilder, private _itemService: ItemService) {
        console.log("constructing AddItemComponent");
    }

    ngOnInit() {
        this.addedItem = this.getNewItem();
        //this.priorities = this._itemService.getCachedPriorities();
        if (!this.priorities) {
            this._itemService.getPriorities()
                .subscribe(
                    data => this.priorities = data,
                    error => console.log(error));
        }
        // The below code is for making data driven forms work
        // this.aForm = this._fb.group({
        //     addedItem.Description: ['', Validators.required],
        //     addedItem.Class:['', Validators.required],
        //     addedItem.Priority:['', Validators.required],
        //     addedItem.DueBy:['', Validators.required]
        // });
    }

    showHideForm(): void {
        this.showForm = !this.showForm;
    }

    onSubmit(): void {
        this._itemService.addItem(this.addedItem)
            .subscribe(
            data => {
                this.notifyAdd.emit(data);
                this.addedItem = this.getNewItem();
                this.showForm = false;
            },
            error => console.log(error));
    }

    Cancel(): void {
        this.addedItem = this.getNewItem();
        this.showForm = false;
    }

    getNewItem(): IItem {
        return {
            Id: 0,
            Description: "",
            PriorityId: null,
            PriorityLevel:"",
            Class: "",
            DueBy: null,
            Status: 1,
            CompletedOn: null,
            SubItems: []
        };
    }
}