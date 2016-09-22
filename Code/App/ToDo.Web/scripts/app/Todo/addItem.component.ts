import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';

import {IItem, IPriority} from './Interfaces';
import {ItemService} from './ItemService';

@Component({
    //moduleId: module.id,
    selector: 'app-addItem',
    templateUrl: './app/Todo/additem.component.html'
})
export class AddItemComponent implements OnInit {
    addedItem: IItem;
    get diagnostic() { return JSON.stringify(this.addedItem); }
    submitted: boolean = false;
    priorities: IPriority[];
    //aForm: FormGroup;

    constructor(private _fb: FormBuilder, private _itemService: ItemService,
        private _router: Router,
        private _route: ActivatedRoute) {
        console.log("constructing AddItemComponent");
    }

    ngOnInit() {
        console.log("in ngoninit() of AddItemComponent.")
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

    ngOnDestroy() {
        console.log("Destroying AddItemComponent.");

    }

    onSubmit(): void {
        this._itemService.addItem(this.addedItem)
            .subscribe(
            data => {
                this.addedItem = this.getNewItem();
                this.goToList();
            },
            error => console.log(error));
    }

    Cancel(): void {
        this.addedItem = this.getNewItem();
        this.goToList();
    }

    getNewItem(): IItem {
        return {
            Id: 0,
            Description: "",
            PriorityId: null,
            PriorityLevel: "",
            Class: "",
            DueBy: null,
            Status: 1,
            CompletedOn: null,
            SubItems: []
        };
    }

    goToList(): void {
        this._router.navigate(['/todo']);
    }
}