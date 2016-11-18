import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule }    from '@angular/http';


import {
    OverdueComponent,
    SubItemComponent,
    ItemService} from './index';

import {ToDoRoutingModule, todoRoutableComponents} from './todo-routing.module';

@NgModule({
    declarations: [
        OverdueComponent,
        SubItemComponent,
        todoRoutableComponents
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ToDoRoutingModule
    ],
    providers: [
        ItemService
        , FormBuilder]
})

export class TodoModule { }