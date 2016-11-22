import { NgModule }       from '@angular/core';
import { BrowserModule  } from '@angular/platform-browser';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { SharedModule } from '../Shared/shared.module';

import {
    OverdueComponent,
    SubItemComponent,
    ItemService,
    CanActivateAuthGuard} from './index';

import {ToDoRoutingModule, todoRoutableComponents} from './todo-routing.module';

@NgModule({
    declarations: [
        OverdueComponent,
        SubItemComponent,
        todoRoutableComponents,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ToDoRoutingModule,
        SharedModule
        
    ],
    providers: [
        ItemService
        , FormBuilder
        ,CanActivateAuthGuard]
})

export class TodoModule { }