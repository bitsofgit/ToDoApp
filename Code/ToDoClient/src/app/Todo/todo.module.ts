import { NgModule }       from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpModule }    from '@angular/http';

import {
    OverdueComponent,
    SubItemComponent,
    ItemService,
    CanActivateAuthGuard} from './index';

import {ToDoRoutingModule, todoRoutableComponents} from './todo-routing.module';
import {SharedModule} from "../Shared/shared.module";

@NgModule({
    declarations: [
        OverdueComponent,
        SubItemComponent,
        todoRoutableComponents,
    ],
    imports: [
        CommonModule,
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