import { NgModule }       from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule }    from '@angular/http';


import {TodoComponent,
    OverdueComponent,
    AddItemComponent,
    EditItemComponent,
    SubItemComponent,
    ItemService} from './index';
import { todoRouting } from './todo.routing';

@NgModule({
    declarations: [
        TodoComponent,
        OverdueComponent,
        AddItemComponent,
        EditItemComponent,
        SubItemComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        todoRouting
    ],
    providers: [
        ItemService
        , FormBuilder]
})

export class TodoModule { }