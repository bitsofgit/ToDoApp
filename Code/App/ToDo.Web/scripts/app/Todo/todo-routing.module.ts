import { NgModule }       from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {TodoComponent, AddItemComponent, EditItemComponent} from "./index";

const todoRoutes: Routes = [
    {
        path: 'todo', component: TodoComponent, data: {
            title: 'ToDo List'
        }
    },
    {
        path: 'todo/add', component: AddItemComponent, data: {
            title: 'Add Item'
        }
    },
    {
        path: 'todo/edit/:id', component: EditItemComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(todoRoutes)],
    exports: [RouterModule]
})

export class ToDoRoutingModule { }

export const todoRoutableComponents = [
    TodoComponent,
    AddItemComponent,
    EditItemComponent
];